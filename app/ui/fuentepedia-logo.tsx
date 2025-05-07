import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
export default function FuentepediaLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Link href="/" className="hidden md:block">
        <h1 className="text-3xl">Fuentepedia</h1>
      </Link>
    </div>
  );
}
