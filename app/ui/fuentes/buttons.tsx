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