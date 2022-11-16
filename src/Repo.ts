import type { Automerge } from "./Automerge";
import type { Doc, ChangeFn } from "@automerge/automerge";
import * as t from "io-ts";
import { MigrationSteps } from "./Migrations";

const RemoteDataType = t.type({
  actorId: t.string,
  docId: t.string,
  change: t.array(t.number),
  name: t.string,
  asJson: t.union([t.undefined, t.unknown]),
});
export type RemoteDataType = t.TypeOf<typeof RemoteDataType>;

type GetInitialValues = ({
  docId,
  name,
}: {
  docId: string;
  name: string;
}) => Promise<RemoteDataType[] | undefined>;

type OnNewValue = ({
  docId,
  actorId,
  name,
  callback,
}: {
  docId: string;
  actorId: string;
  name: string;
  callback: (value: RemoteDataType) => void;
}) => void;

export type Adapter = {
  type: string;
  getInitialValues: GetInitialValues;
  onNewValue: OnNewValue;
  insertValue: (value: RemoteDataType) => Promise<void>;
  insertValues: (value: RemoteDataType[]) => Promise<void>;
};

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
  automerge,
}: {
  name: string;
  migrations: MigrationSteps<DocType>;
  docId: string;
  adapter: Adapter;
  automerge: Automerge;
}) {
  try {
    const initialValue = await adapter.getInitialValues({ docId, name });
    if (initialValue) {
      const binaryChanges = initialValue.map((iv) => new Uint8Array(iv.change));
      const [doc] = automerge.applyChanges<DocType>(
        automerge.init(),
        binaryChanges
      );
      return new Repo(name, doc, docId, adapter, false, automerge);
    }
    throw Error("Initial value not set");
  } catch (error) {
    return new Repo(
      name,
      automerge.from(migrations.initialValue),
      docId,
      adapter,
      true,
      automerge
    );
  }
}

class Repo<DocType> {
  public document: Doc<DocType>;
  private name: string;
  private docId: string;
  private actorId: string;
  private listeners: Array<(doc: Doc<DocType>) => void> = [];
  private adapter: Adapter;
  private automerge: Automerge;

  constructor(
    name: string,
    initialDocument: Doc<DocType>,
    docId: string,
    adapter: Adapter,
    isFirstInstance: boolean,
    automerge: Automerge
  ) {
    this.name = name;
    this.document = initialDocument;
    this.docId = docId;
    this.actorId = automerge.getActorId(initialDocument);
    this.adapter = adapter;
    this.automerge = automerge;
    adapter.onNewValue({
      docId,
      name,
      actorId: this.actorId,
      callback: (change) => this.applyRemoteChange(change),
    });
    if (isFirstInstance) {
      this.sendInitialChangesToServer(
        this.automerge.getAllChanges(this.document)
      );
    }
  }

  public updatedDataLocal = (callback: ChangeFn<DocType>) => {
    const newDoc = this.automerge.change(this.document, callback);
    const change = this.automerge.getLastLocalChange(newDoc);
    this.updateDoc(newDoc);
    if (change) {
      this.sendUpdateToServer(change);
    }
  };

  public addListener = (callback: (doc: Doc<DocType>) => void) => {
    this.listeners.push(callback);
  };

  public removeListener = (callback: (doc: Doc<DocType>) => void) => {
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
    return await this.adapter.insertValues(values);
  };

  private sendUpdateToServer = async (change: Uint8Array) => {
    const value: RemoteDataType = {
      actorId: this.actorId,
      docId: this.docId,
      name: this.name,
      change: Array.from(change),
      asJson: JSON.stringify(this.document),
    };
    return await this.adapter.insertValue(value);
  };

  private applyRemoteChange = (remoteData: RemoteDataType) => {
    const [newDoc] = this.automerge.applyChanges(this.document, [
      new Uint8Array(remoteData.change),
    ]);
    this.updateDoc(newDoc);
  };

  private updateDoc = (newDoc: Doc<DocType>) => {
    this.document = newDoc;
    this.updateListeners();
  };

  private updateListeners = () => {
    this.listeners.forEach((callback) => {
      callback(this.document);
    });
  };
}
