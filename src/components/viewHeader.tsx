import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ViewHeaderProps { }

export default function ViewHeader({ }: ViewHeaderProps) {
  return (
    <div className="flex justify-between items-center w-full h-full  px-4 py-2 bg-zinc-800 relative shadow-md">
      {/* logo */}
      <Link href="/edit">
        <div className="flex items-center space-x-2 animate-hue-rotate relative">
          <Image
            src="/logo2.png"
            alt="logo"
            className="absolute top-0 left-0 blur-xl"
            width={42}
            height={42}
          />
          <Image src="/logo2.png" alt="logo" width={36} height={36} />
          <div className="text-zinc-300 text-xl font-semibold">NACG</div>
        </div>
      </Link>

      {/* title */}
      <div className="text-zinc-300 text-xl font-semibold absolute left-1/2 transform -translate-x-1/2">
        Not Another CSS Generator
      </div>
    </div>
  );
}
