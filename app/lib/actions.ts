import { signIn } from "next-auth/react";

export async function authenticateGoogle() {
  signIn('google', { callbackUrl: '/home' })
}