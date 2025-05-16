import type { NextAuthConfig } from 'next-auth';
import { sql } from '@vercel/postgres';
import { User } from './app/lib/definitions/users.definitions';

async function getUserExists(id: string | undefined) {
  try {
    if (!id) return false;
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    const data = result.rows;
    if (data.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}

async function getUserAdminEditor(id: string | undefined) {
  try {
    if (!id) return false;
    const result = await sql`SELECT users.role FROM users WHERE id = ${id}`;
    const user = result.rows[0] as User;
    if (user.role === 'admin' || user.role === 'editor') return true;
    else return false;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}

async function getUserAdmin(id: string | undefined) {
  try {
    if (!id) return false;
    const result = await sql`SELECT users.role FROM users WHERE id = ${id}`;
    const user = result.rows[0] as User;
    if (user.role === 'admin') return true;
    else return false;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw new Error('No se pudo obtener el usuario');
  }
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user?.id;

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdminEditorMenu =
        nextUrl.pathname.startsWith('/dashboard/admin');
      const isOnAdminMenu = nextUrl.pathname.startsWith(
        '/dashboard/admin/users',
      );
      const root = nextUrl.pathname === '/';

      if (!root && !isLoggedIn && !isOnDashboard) {
        return Response.redirect(new URL('/', nextUrl));
      }
      if (isLoggedIn && !isOnDashboard) {
        return Response.redirect(new URL('/dashboard/ubicaciones', nextUrl));
      }

      if (isOnAdminMenu) {
        const isAdmin = await getUserAdmin(auth?.user?.id);
        if (isAdmin) {
          return true;
        } else {
          return Response.redirect(new URL('/dashboard/ubicaciones', nextUrl));
        }
      }
      if (isOnAdminEditorMenu) {
        const isAdminEditor = await getUserAdminEditor(auth?.user?.id);
        if (isAdminEditor) {
          return true;
        } else {
          return Response.redirect(new URL('/dashboard/ubicaciones', nextUrl));
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      if (token.id) {
        const UserExists = await getUserExists(token.id as string);
        if (!UserExists) {
          return {};
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.id) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        if (token.name) {
          session.user.name = token.name;
        }
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
