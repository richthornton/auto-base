import * as Automerge from "@automerge/automerge";
import * as t from "io-ts";
import { MigrationSteps } from "./Migrations";
import { SupabaseV1Adapter } from "./SupabaseAdapter";

const RemoteDataType = t.type({
  actorId: t.string,
  docId: t.string,
  change: t.array(t.number),
  name: t.string,
  asJson: t.union([t.undefined, t.unknown]),
});
type RemoteDataType = t.TypeOf<typeof RemoteDataType>;

type Adapter = SupabaseV1Adapter;

export type Repository<DocType extends Record<string, unknown>> = Awaited<
  ReturnType<typeof RepositoryConstructor<DocType>>
>;
export async function RepositoryConstructor<
  DocType extends Record<string, unknown>
>({
  name,
  migrations,
  docId,
  adapter,
}: {
  name: string;
  migrations: MigrationSteps<DocType>;
  docId: string;
  adapter: Adapter;
}) {
  try {
    const initialValue = await adapter.supabaseClient
      .from<RemoteDataType>(adapter.tableName)
      .select()
      .eq("docId", docId)
      .eq("name", name);
    if (initialValue.data && initialValue.data.length > 0) {
      const binaryChanges = initialValue.data.map(
        (iv) => new Uint8Array(iv.change)
      );
      const [doc] = Automerge.applyChanges<DocType>(
        Automerge.init(),
        binaryChanges
      );
      return new Repo(name, doc, docId, adapter, false);
    }
    throw Error("Initial value not set");
  } catch (error) {
    return new Repo(
      name,
      Automerge.from(migrations.initialValue),
      docId,
      adapter,
      true
    );
  }
}

class Repo<DocType> {
  public document: Automerge.Doc<DocType>;
  private name: string;
  private docId: string;
  private actorId: string;
  private listeners: Array<(doc: Automerge.Doc<DocType>) => void> = [];
  private adapter: Adapter;

  constructor(
    name: string,
    initialDocument: Automerge.Doc<DocType>,
    docId: string,
    adapter: Adapter,
    isFirstInstance: boolean
  ) {
    this.name = name;
    this.document = initialDocument;
    this.docId = docId;
    this.actorId = Automerge.getActorId(initialDocument);
    this.adapter = adapter;
    adapter.supabaseClient
      // in Supabase you can only subscribe once to a specific query, so have to be as specific as possible for each repo
      .from<RemoteDataType>(`${adapter.tableName}:docId=eq.${docId}`)
      .on("INSERT", (payload) => {
        const insertedChange = payload.new;
        // if the change was inserted by this client, then ignore it
        if (
          insertedChange.actorId === this.actorId ||
          insertedChange.name !== this.name
        ) {
          return;
        }
        this.applyRemoteChange(insertedChange);
      })
      .subscribe();
    if (isFirstInstance) {
      this.sendInitialChangesToServer(Automerge.getAllChanges(this.document));
    }
  }

  public updatedDataLocal = (callback: Automerge.ChangeFn<DocType>) => {
    const newDoc = Automerge.change(this.document, callback);
    const change = Automerge.getLastLocalChange(newDoc);
    this.updateDoc(newDoc);
    if (change) {
      this.sendUpdateToServer(change);
    }
  };

  public addListener = (callback: (doc: Automerge.Doc<DocType>) => void) => {
    this.listeners.push(callback);
  };

  public removeListener = (callback: (doc: Automerge.Doc<DocType>) => void) => {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  };

  private sendInitialChangesToServer = async (changes: Uint8Array[]) => {
    const values = changes.map((change) => {
      const value: RemoteDataType = {
        actorId: this.actorId,
        docId: this.docId,
        name: this.name,
        change: Array.from(change),
        asJson: JSON.stringify(this.document),
      };
      return value;
    });
    return await this.adapter.supabaseClient
      .from<RemoteDataType>(this.adapter.tableName)
      .insert(values);
  };

  private sendUpdateToServer = async (change: Uint8Array) => {
    const value: RemoteDataType = {
      actorId: this.actorId,
      docId: this.docId,
      name: this.name,
      change: Array.from(change),
      asJson: JSON.stringify(this.document),
    };
    return await this.adapter.supabaseClient
      .from<RemoteDataType>(this.adapter.tableName)
      .insert(value);
  };

  private applyRemoteChange = (remoteData: RemoteDataType) => {
    const [newDoc] = Automerge.applyChanges(this.document, [
      new Uint8Array(remoteData.change),
    ]);
    this.updateDoc(newDoc);
  };

  private updateDoc = (newDoc: Automerge.Doc<DocType>) => {
    this.document = newDoc;
    this.updateListeners();
  };

  private updateListeners = () => {
    this.listeners.forEach((callback) => {
      callback(this.document);
    });
  };
}
