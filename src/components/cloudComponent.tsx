import supabase from "@/lib/supabase";
import CloudComponentRender from "./cloudComponetRender";

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
  const component = await supabase
    .from("component")
    .select()
    .eq("name", name)
    .single();

  if (component.error) {
    return <div>error</div>;
  }

  let demo = null;

  if (searchParams && searchParams.showDemo) demo = true;

  const version = await supabase
    .from("version")
    .select()
    .eq("id", demo ? component.data.demo_version : component.data.live_version)
    .single();

  if (version.error) {
    return <div>error</div>;
  }

  return (
    <CloudComponentRender
      data={data}
      component={component.data}
      version={version.data}
    />
  );
}
