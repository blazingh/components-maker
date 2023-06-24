import { DtoComponentItem, DtoVersionItem } from "@/types/types";
import { Label } from "../ui/label";
import EnabledVersionsChanger from "../enabledVersionsChanger";
import ComponentCardSettings from "../componentCardSettings";

interface ComponentCardProps {
  component: DtoComponentItem;
  versions?: DtoVersionItem[];
}

export default function ComponentCard({
  component,
  versions,
}: ComponentCardProps) {
  const latestVersion = versions && versions[versions.length - 1];

  const versionPropreties = versions?.map((version) => {
    return { label: version.version, value: version.id };
  });

  return (
    <div className="border border-gray-200 rounded-md p-2 pb-3 w-96 gap-y-2 flex flex-col">
      <div className="flex flex-row justify-between w-full">
        <div className="flex items-center gap-x-4">
          <Label className="text-lg">{component.name}</Label>
          <Label className="text-xs">
            Latest Version : {latestVersion?.version || 0}
          </Label>
        </div>
        <ComponentCardSettings component={component} />
      </div>
      <EnabledVersionsChanger
        component={component}
        porperties={versionPropreties || []}
        demo_version={component.demo_version}
        live_version={component.live_version}
      />
    </div>
  );
}
