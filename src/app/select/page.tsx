import ComponentCard from "@/components/cards/componentCard";
import supabase from "@/lib/supabase";
import { DtoComponentItem, DtoVersionItem } from "@/types/types";

export const revalidate = 0;

export default async function Page() {
  const components = await supabase.from("component").select();
  const versions = await supabase
    .from("version")
    .select("id, component, version");

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center w-full pt-4">
      {components.data?.map((component) => {
        const componentVersions = versions.data?.filter(
          (version) => version.component === component.id
        );

        return (
          <ComponentCard
            key={component.id}
            component={component as DtoComponentItem}
            versions={componentVersions as DtoVersionItem[]}
          />
        );
      })}
    </div>
  );
}
