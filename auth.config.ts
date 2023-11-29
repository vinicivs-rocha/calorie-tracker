import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
 
enum ProtectedRoutes {
  HOME = '/home'
}

export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = Object.values(ProtectedRoutes).some(route => nextUrl.pathname.startsWith(route));
      if (isProtectedRoute) {
        return isLoggedIn
      }
      if (isLoggedIn) {
        return Response.redirect(new URL(ProtectedRoutes.HOME, nextUrl));
      }
      return true
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
} satisfies NextAuthConfig;