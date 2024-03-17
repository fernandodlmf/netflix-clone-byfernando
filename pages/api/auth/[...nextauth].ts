import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from '@/lib/prismadb'
import { compare } from 'bcrypt';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider  from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),

        GithubProvider({
          clientId: process.env.GITHUB_ID || '',
          clientSecret: process.env.GITHUB_SECRET || ''
        }),

        Credentials({
          id: 'credentials',
          name: 'Credentials',
          credentials: {
            email: {
              label: 'Email',
              type: 'text',
            },
            password: {
              label: 'Password',
              type: 'passord'
            }
          },
          async authorize(credentials) {
            
            try {
                
            console.log('ta aqui')
            if (!credentials?.email || !credentials?.password) {
              throw new Error('Email and password required');
            }
    
            const user = await prismadb.user.findUnique({ where: {
              email: credentials.email
            }});
    
            if (!user || !user.hashPassword) {
              throw new Error('Email does not exist');
            }
    
            const isCorrectPassword = await compare(credentials.password, user.hashPassword);
    
            if (!isCorrectPassword) {
              throw new Error('Incorrect password');
            }
    
            return user;
        
            } catch (err) {
                throw new Error('Next Auth - Authorize: Authentication error');
            }

          }
        })
      ],
    pages: {
        signIn: '/auth'
    },   

    session: {
        strategy: 'jwt'
    },
    
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    adapter: PrismaAdapter(prismadb)

})