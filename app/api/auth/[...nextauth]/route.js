




// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Replace with actual logic to validate credentials
        if (credentials.email === "test@example.com" && credentials.password === "password") {
          return { id: 1, name: 'Test User', email: credentials.email };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      console.log('Session callback:', { session, token }); // Debugging line
      session.user.id = token.sub;
      session.user.email = token.email;
      return session;
    }
  }
};

export async function GET(req, res) {
  return await NextAuth(req, res, authOptions);
}

export async function POST(req, res) {
  return await NextAuth(req, res, authOptions);
}

