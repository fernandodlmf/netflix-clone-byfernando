import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from '@/lib/prismadb'
import { compare } from 'bcrypt';

export default NextAuth({
    providers: [
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
    debug: true

})