import { SupabaseClient } from "@supabase/supabase-js";
import { Adapter, RemoteDataType } from "./Repo";

export function SupabaseV1Adapter(
  supabaseClient: SupabaseClient,
  tableName: string
): Adapter {
  const getInitialValues = async ({
    docId,
    name,
  }: {
    docId: string;
    name: string;
  }) => {
    const returnValue = await supabaseClient
      .from<RemoteDataType>(tableName)
      .select()
      .eq("docId", docId)
      .eq("name", name);
    if (returnValue.data && returnValue.data.length > 0) {
      return returnValue.data;
    } else {
      return undefined;
    }
  };
  const onNewValue = ({
    docId,
    actorId,
    name,
    callback,
  }: {
    docId: string;
    actorId: string;
    name: string;
    callback: (value: RemoteDataType) => void;
  }) =>
    supabaseClient
      // in Supabase you can only subscribe once to a specific query, so have to be as specific as possible for each repo
      .from<RemoteDataType>(`${tableName}:docId=eq.${docId}`)
      .on("INSERT", (payload) => {
        const insertedChange = payload.new;
        // if the change was inserted by this client, then ignore it
        if (
          insertedChange.actorId === actorId ||
          insertedChange.name !== name
        ) {
          return;
        }
        callback(insertedChange);
      })
      .subscribe();
  const insertValue = async (value: RemoteDataType) => {
    await supabaseClient.from<RemoteDataType>(tableName).insert(value);
    return;
  };
  const insertValues = async (value: RemoteDataType[]) => {
    await supabaseClient.from<RemoteDataType>(tableName).insert(value);
    return;
  };
  return {
    type: "SupabaseV1Adapter",
    getInitialValues,
    onNewValue,
    insertValue,
    insertValues,
  } as const;
}
