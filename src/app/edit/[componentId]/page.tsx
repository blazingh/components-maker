import * as React from "react";

import { DtoComponentItem, DtoVersionItem } from "@/types/types";
import supabase from "@/lib/supabase";
import ComponentEditPage from "@/components/componentEditPage";
import { initialVersionData } from "@/constants/version";

export const revalidate = 0;

export default async function Demo({
  params: { componentId },
}: {
  params: { componentId: string };
}) {
  const component = await supabase
    .from("component")
    .select()
    .eq("id", componentId)
    .single();

  if (!component || component.error) return <div>Component not found</div>;

  let componentVersions = await supabase
    .from("version")
    .select()
    .eq("component", componentId);

  if (
    !componentVersions ||
    componentVersions.error ||
    componentVersions.data.length === 0
  ) {
    const res = await supabase.from("version").insert({
      component: componentId,
      version: "1",
      version_name: "Initial Version",
      data: initialVersionData,
    });
    if (res.error) {
      return <div>Failed to create initial version</div>;
    } else {
      componentVersions = await supabase
        .from("version")
        .select()
        .eq("component", componentId);
    }
  }

  return (
    <ComponentEditPage
      _component={component.data as DtoComponentItem}
      _componentVersions={componentVersions.data as DtoVersionItem[]}
    />
  );
}
