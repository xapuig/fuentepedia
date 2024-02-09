import { Metadata } from "next";
import Map from '@/app/ui/fuentes/print-map';
import { fetchUbicacionById } from "@/app/lib/data";
// import { notFound } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Clientes',
};
export default async function Page({ params }: { params: { id: string } }) {
   const id = params.id;
   const [ubicacion] = await Promise.all([
    fetchUbicacionById(id),
  ]);
  if (!ubicacion) {
    // notFound();
  }
  
return (
  <main>
    <Map ubicacion={ubicacion} /> 
  </main>
);
}

