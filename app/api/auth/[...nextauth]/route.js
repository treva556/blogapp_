

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Replace with your own authentication logic
        const user = { id: 1, name: 'Test User', email: credentials.email };

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin', // Customize the sign-in page if needed
  },
  session: {
    strategy: 'jwt', // Use JSON Web Tokens for session management
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    }
  }
};

// NextAuth.js requires a named export for each HTTP method
export async function GET(req) {
  return NextAuth(req, authOptions);
}

export async function POST(req) {
  return NextAuth(req, authOptions);
}