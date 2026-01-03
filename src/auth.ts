import { type NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const JWT_EXPIRE_TIME = 10 * 60; // 10 minutes in seconds

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      issuer: process.env.COGNITO_ISSUER,
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
    }),
  ],
  session: { 
    strategy: "jwt",
    maxAge: JWT_EXPIRE_TIME, // 10 minutes (600 seconds)
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.iat = Math.floor(Date.now() / 1000);
        token.exp = token.iat + JWT_EXPIRE_TIME;
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || token.id;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
