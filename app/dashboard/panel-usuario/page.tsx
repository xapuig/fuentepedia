import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';
import { UserInfo } from '@/app/ui/panel-usuario/user-info';
import { auth } from '@/auth';
import { forbidden } from 'next/navigation';
export const metadata: Metadata = {
  title: 'Panel de usuario',
};

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) {
    forbidden();
  }
  return (
    <>
      {/* <RefreshUserSession /> */}
      <main className="flex flex-col gap-4">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: 'Panel de usuario',
              href: '/dashboard/panel-usuario',
              active: true,
            },
          ]}
        />
        <div className="flex items-center justify-between gap-2 md:mt-8">
          <UserInfo />
        </div>
      </main>
    </>
  );
}
