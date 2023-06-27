import pb from "@/lib/pocketbase";
import CloudComponentRender from "./cloudComponetRender";
import { safePocketBase } from "@/hooks/pocketbase";
import { DtoComponentItem, DtoVersionItem } from "@/types/types";

interface CloudComponentProps {
  name: string;
  searchParams?: { [key: string]: string | string[] | undefined };
  data?: { [key: string]: any };
}

export default async function CloudComponent({
  name,
  searchParams,
  data,
}: CloudComponentProps) {
  const component = await safePocketBase.getFirstListItem<DtoComponentItem>(
    "components",
    "name",
    { name }
  );

  if (!component) {
    return <div>component not found</div>;
  }

  let demo = null;

  if (searchParams && searchParams.showDemo) demo = true;

  const version = await safePocketBase.getFirstListItem<DtoVersionItem>(
    "versions",
    "id",
    {
      id: demo ? component.demo_version : component.live_version,
    }
  );

  if (!version) {
    return <div>version not found</div>;
  }

  return (
    <CloudComponentRender data={data} component={component} version={version} />
  );
}
