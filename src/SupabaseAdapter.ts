import { SupabaseClient } from "@supabase/supabase-js";

export type SupabaseV1Adapter = ReturnType<typeof SupabaseV1Adapter>;

export function SupabaseV1Adapter(
  supabaseClient: SupabaseClient,
  tableName: string
) {
  return {
    type: "SupabaseV1Adapter",
    supabaseClient,
    tableName,
  } as const;
}
