import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
// https://github.com/nextauthjs/next-auth/issues/6106#issuecomment-1582582312
import type { Adapter } from 'next-auth/adapters'
import EmailProvider from 'next-auth/providers/email'

import { prisma } from '@/libs/prisma'

const EMAIL_SERVER = process.env.EMAIL_SERVER
const EMAIL_FROM = process.env.EMAIL_FROM
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

if (!EMAIL_SERVER || !EMAIL_FROM || !NEXTAUTH_SECRET) {
  throw new Error('EMAIL_SERVER, EMAIL_FROM, or NEXTAUTH_SECRET not found.')
}

export default NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    EmailProvider({
      server: EMAIL_SERVER,
      from: EMAIL_FROM,
    }),
  ],
  secret: NEXTAUTH_SECRET,
})
