import supabase from "@/lib/supabase";

export default async function Page() {
  const components = await supabase.from("component").select();
  const versions = await supabase.from("version").select();
  const enabled = await supabase.from("enabled").select();

  return (
    <div>
      <h1>Components</h1>
      {/* button to console.log(data) */}
    </div>
  );
}
