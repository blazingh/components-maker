import CloudComponent from "@/components/cloudComponent";

export const revalidate = 0;

export default function Demo({
  params: { componentName },
  searchParams,
}: {
  params: { componentName: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = {
    name: "demo",
    subname: "sub demo",
    description: "demo description",
    live_version: "1",
  };
  return (
    <div>
      <CloudComponent
        name={componentName}
        searchParams={searchParams}
        data={data}
      />
    </div>
  );
}
