import type { NextAuthConfig } from 'next-auth';
import { sql } from '@vercel/postgres';

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

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user?.id;

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        } else {
          return true;
        }
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard/ubicaciones', nextUrl));
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
