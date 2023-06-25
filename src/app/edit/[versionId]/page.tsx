import * as React from "react";

import { DtoComponentItem, DtoVersionItem } from "@/types/types";
import supabase from "@/lib/supabase";
import ComponentEditPage from "@/components/componentEditPage";

export const revalidate = 0;

export default async function Demo({
  params: { versionId },
}: {
  params: { versionId: string };
}) {
  const version: any = await supabase
    .from("version")
    .select()
    .eq("id", versionId)
    .single();

  if (!version || version.error) return <div>Version not found</div>;

  const component = await supabase
    .from("component")
    .select()
    .eq("id", version.data.component)
    .single();

  if (!component || component.error) return <div>Component not found</div>;

  const allVersions = await supabase
    .from("version")
    .select()
    .eq("component", version.data.component);

  if (!allVersions || allVersions.error) return <div>Versions not found</div>;

  return (
    <ComponentEditPage
      component={component.data as DtoComponentItem}
      version={version.data as DtoVersionItem}
      versions={allVersions.data as DtoVersionItem[]}
    />
  );
}
