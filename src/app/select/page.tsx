import ComponentCard from "@/components/cards/componentCard";
import supabase from "@/lib/supabase";
import { DtoComponentItem, DtoEnabled, DtoVersionItem } from "@/types/types";

export const revalidate = 0;

export default async function Page() {
  const components = await supabase.from("component").select();
  const versions = await supabase
    .from("version")
    .select("id, component, version");
  const enabled = await supabase.from("enabled").select();

  return (
    <div className="grid gap-4 ">
      {components.data?.map((component) => {
        // array of versions for this component
        const componentVersions = versions.data?.filter(
          (version) => version.component === component.id
        );

        const enabledVersions = enabled.data?.find(
          (item) => item.component === component.id
        );

        return (
          <ComponentCard
            key={component.id}
            component={component as DtoComponentItem}
            versions={componentVersions as DtoVersionItem[]}
            enabled={enabledVersions as DtoEnabled}
          />
        );
      })}
    </div>
  );
}
