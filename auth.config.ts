import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnLogin) {
        if (isLoggedIn) {
            if (nextUrl.search.includes('callbackUrl')) {
                const callbackUrl = nextUrl.search.replace("?callbackUrl=", "");
                const redirectUrlDecoded = decodeURIComponent(callbackUrl);
                return Response.redirect(new URL(redirectUrlDecoded));
            } else {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
        }
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