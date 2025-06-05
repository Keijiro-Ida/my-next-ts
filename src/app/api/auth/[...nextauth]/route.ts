import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/generated/prisma/client";
import { compare } from "bcryptjs";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            const user = await prisma.user.findUnique({
            where: { email: credentials?.email }
            });
            if (user && await compare(credentials!.password, user.password)) {
            return { id: user.id, email: user.email };
            }
            return null;
        }
        })
    ],
    session: {
        strategy: "jwt" as const,
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT, user?: User }) {
        // ログイン時のみuserが存在
        if (user) {
            token.id = user.id;
        }
        return token;
        },
        async session({ session, token } : { session: Session, token: JWT }) {
        // session.userにidを追加
        if (session.user && token.id) {
            (session.user as { id?: string }).id = token.id as string;
        }
        return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
