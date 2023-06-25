import * as React from "react";

import { DtoComponentItem, DtoVersionItem } from "@/types/types";
import supabase from "@/lib/supabase";
import ComponentEditPage from "@/components/componentEditPage";

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

  const componentVersions = await supabase
    .from("version")
    .select()
    .eq("component", componentId);

  if (!componentVersions || componentVersions.error)
    return <div>Component versions not found</div>;

  return (
    <ComponentEditPage
      _component={component.data as DtoComponentItem}
      _componentVersions={componentVersions.data as DtoVersionItem[]}
    />
  );
}
