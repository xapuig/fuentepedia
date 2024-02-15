import { Metadata } from "next";
import Map from '@/app/ui/fuentes/print-map';
import { fetchUbicacionById, fetchFuentesByUbicacionId, fetchUbicaciones } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
// import { notFound } from 'next/navigation';
import { CreateFuente } from '@/app/ui/fuentes/buttons';
import Form from "@/app/ui/fuentes/select-form";

export const metadata: Metadata = {
  title: 'Mapa de fuentes',
};
export default async function Page({ params }: { params: { id: string } }) {
   const id = params.id;
   const [ubicacion, fuentes, ubicaciones] = await Promise.all([
    fetchUbicacionById(id),
    fetchFuentesByUbicacionId(id),
    fetchUbicaciones(),
  ]);
  if (!ubicacion) {
    // notFound();
  }
  
return (
  
  <div className="w-full">
    <Breadcrumbs
        breadcrumbs={[
          { label: 'Fuentes', href: '/dashboard/fuentes' },
          {
            label: `${ubicacion[0].name}`,
            href: `/dashboard/fuentes/${id}`,
            active: true,
          },
        ]}
      /> 
      <Form ubicaciones={ubicaciones} />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">   
        <CreateFuente id={id}/>
      </div>
      <Map ubicacion={ubicacion} fuentes={fuentes} />
  </div>
);
}

