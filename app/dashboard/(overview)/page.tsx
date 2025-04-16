import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Inicio',
};
export default async function Page() {
  redirect('/dashboard/fuentes');
}
