import ComponentCard from "@/components/cards/componentCard";
import NewComponentCreator from "@/components/newComponentcreator";
import pb from "@/lib/pocketbase";
import { DtoComponentItem, DtoVersionItem } from "@/types/types";

export const revalidate = 0;

export default async function Page() {
  const components = await pb
    .collection("components")
    .getFullList<DtoComponentItem>();

  const versions = await pb
    .collection("versions")
    .getFullList<DtoVersionItem>();

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full pt-4">
      <div className="flex flex-wrap gap-4 items-center pt-4 justify-center">
        {components?.map((component) => {
          const componentVersions = versions?.filter(
            (version) => version.component === component.id
          );
          return (
            <ComponentCard
              key={component.id}
              component={component}
              versions={componentVersions}
            />
          );
        })}
      </div>
      <NewComponentCreator />
    </div>
  );
}
