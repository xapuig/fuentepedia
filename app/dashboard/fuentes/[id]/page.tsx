import { Metadata } from "next";
import Map from '@/app/ui/fuentes/print-map';
import { fetchUbicacionById } from "@/app/lib/data";
import { fetchFuentesByUbicacionId } from '@/app/lib/data';
// import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Clientes',
};
export default async function Page({ params }: { params: { id: string } }) {
   const id = params.id;
   const [ubicacion, fuentes] = await Promise.all([
    fetchUbicacionById(id),
    fetchFuentesByUbicacionId(id),
  ]);
  if (!ubicacion) {
    // notFound();
  }
  
return (
  <main>
    <Map ubicacion={ubicacion} fuentes={fuentes} /> 
  </main>
);
}

