import { deleteFuente } from "@/app/lib/actions";
import Link from "next/link";

export function CreateFuente({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/fuentes/${id}/create`}
        className="bg-blue-500 mb-6 text-white rounded-md border p-2 hover:bg-blue-400"
      >
       <span className="hidden md:block">Añadir fuente</span>
      </Link>
    );
  }


  export function CreateFuenteInfoWindow({ id, lat, lng }: { id: string, lat: number, lng: number }) {
    return (
      <Link 
      href={{ pathname: `/dashboard/fuentes/${id}/create`, query: { lat: lat, lng: lng } }}
      className="mt-2 text-blue-500 hover:text-blue-400">
        Añadir fuente
      </Link>
     
    );
  }

  export function EditFuente({ id }: { id: string }) {
    return (
      <Link
        href={`/dashboard/fuentes/${id}/edit`}
        className="mt-2 text-blue-500 hover:text-blue-400"
      >
        Editar
      </Link>
    );
  }

  export function DeleteFuente({ id }: { id: string }) {
    const deleteFuentewithId = deleteFuente.bind(null, id);
    return (
      <form action={deleteFuentewithId}>
        <button className="mt-2 text-red-500 hover:text-red-400">
          Borrar
        </button>
      </form>
    );
  }
  