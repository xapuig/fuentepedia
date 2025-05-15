import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import Image from 'next/image';
export default function FuentepediaLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Link href="/dashboard/ubicaciones" className="">
        <Image alt="Logo fuentepedia" src="/fuentepedia_logo.png" width={300} height={300}></Image>
        {/* <h1 className="text-3xl md:hidden">Fuentepedia</h1> */}
      </Link>
    </div>
  );
}
