import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
        if (user) token.role = user.role;
        return token
    },
    async session({ session, token }) {
        if (session?.user) session.user.role = token.role
        // return session;
        return {
            ...session,
            token: token
        }
    }

  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;