import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const res = await fetch("https://example.com/api/auth/session", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     username: credentials.username,
        //     password: credentials.password,
        //   }),
        //   headers: { "Content-Type": "application/json" },
        // });

        // const user = await res.json();

        // if (res.ok && user) {
        // TODO - Set up the endpoint
        return {
          id: 1,
          username: "test-1",
          email: "test@gmail.com",
          role: "user",
        };
        // }
        // return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.username = token.username;
        session.email = token.email;
        session.role = token.role;
      }

      return session;
    },
  },
};

// export default NextAuth(authOptions);
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
