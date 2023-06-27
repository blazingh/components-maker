import * as React from "react";

import { DtoComponentItem, DtoVersionItem } from "@/types/types";
import ComponentEditPage from "@/components/componentEditPage";
import pb from "@/lib/pocketbase";
import { InitialVersionCreator } from "@/components/initialVersionCreator";

export const revalidate = 0;

export default async function Demo({
  params: { componentId },
}: {
  params: { componentId: string };
}) {
  let component: DtoComponentItem | null = null;

  let componentVersions: DtoVersionItem[] | null = null;

  try {
    component = await pb
      .collection("components")
      .getOne<DtoComponentItem>(componentId);
  } catch (error) {
    return <div>Component not found</div>;
  }

  try {
    componentVersions = await pb
      .collection("versions")
      .getFullList<DtoVersionItem>({ component: componentId });
  } catch (error) {
    return <div>Component Versions not found</div>;
  }

  if (componentVersions.length === 0)
    return <InitialVersionCreator componentId={componentId} />;

  return (
    <ComponentEditPage
      _component={component}
      _componentVersions={componentVersions}
    />
  );
}
