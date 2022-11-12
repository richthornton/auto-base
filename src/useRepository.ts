import * as Automerge from "@automerge/automerge";
import { useEffect, useState } from "react";
import { Repository } from "./Repo";

export function useRepository<DocType extends Record<string, unknown>>(
  repository: Repository<DocType>
) {
  const [externalDoc, updateExternalDoc] = useState(repository.document);
  useEffect(() => {
    const updater = (newDoc: Automerge.Doc<DocType>) =>
      updateExternalDoc(newDoc);
    repository.addListener(updater);
    return () => {
      repository.removeListener(updater);
    };
  }, [updateExternalDoc]);
  return [
    externalDoc,
    (callback: Automerge.ChangeFn<DocType>) =>
      repository.updatedDataLocal(callback),
  ] as const;
}
