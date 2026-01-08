import { type NextAuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import { JWT_EXPIRE_TIME } from "./constants";

/**
 * NextAuth.js authentication configuration for AWS Cognito integration.
 * 
 * This configuration handles user authentication using AWS Cognito as the identity provider,
 * with JWT-based session management for secure, stateless authentication.
 * 
 * @remarks
 * **Session Strategy**: Uses JWT tokens stored in HTTP-only cookies
 * **Token Expiration**: 1 hour (3600 seconds, configurable via JWT_EXPIRE_TIME)
 * **Provider**: AWS Cognito OAuth2/OIDC
 * 
 * @example
 * ```typescript
 * // Usage in API route
 * import NextAuth from "next-auth";
 * import { authOptions } from "@/auth";
 * 
 * const handler = NextAuth(authOptions);
 * export { handler as GET, handler as POST };
 * ```
 * 
 * @see {@link https://next-auth.js.org/configuration/options NextAuth Configuration}
 * @see {@link https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html AWS Cognito User Pools}
 * 
 * @requires Environment Variables:
 * - `COGNITO_ISSUER` - Cognito user pool issuer URL (e.g., https://cognito-idp.region.amazonaws.com/region_poolId)
 * - `COGNITO_CLIENT_ID` - OAuth2 client ID from Cognito app client
 * - `COGNITO_CLIENT_SECRET` - OAuth2 client secret from Cognito app client
 * - `NEXTAUTH_SECRET` - Secret key for encrypting tokens (generate with: openssl rand -base64 32)
 * - `NEXTAUTH_URL` - Application URL for OAuth callbacks (e.g., http://localhost:3000)
 */
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
    maxAge: JWT_EXPIRE_TIME, // 60 minutes (3600 seconds)
  },
  callbacks: {
    /**
     * JWT callback - executed whenever a JWT is created or updated.
     * 
     * Adds Cognito access token and ID token to the JWT payload for API requests.
     * Sets token issuance and expiration times for session management.
     * 
     * @param token - The JWT token object
     * @param account - OAuth account data (only present during sign-in)
     * @param user - User object (only present during initial sign-in)
     * @returns Updated JWT token with access tokens and expiration
     */
    async jwt({ token, account, user }) {
      if (account) {
        token.iat = Math.floor(Date.now() / 1000);
        token.exp = token.iat + JWT_EXPIRE_TIME;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.id = user.id;
      }
      
      // Refresh token if expired
      if (token.exp && token.exp * 1000 < Date.now()) {
      try {
        const response = await fetch(`${process.env.COGNITO_ISSUER}/oauth2/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.COGNITO_CLIENT_ID as string,
          client_secret: process.env.COGNITO_CLIENT_SECRET as string,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken as string,
        }),
        });
        const refreshedTokens = await response.json();
        token.accessToken = refreshedTokens.access_token;
        token.exp = Math.floor(Date.now() / 1000) + JWT_EXPIRE_TIME;
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
      }
      return token;
    },
    /**
     * Session callback - executed whenever a session is checked.
     * 
     * Maps JWT token data to the session object that's accessible via useSession().
     * Exposes user ID and access token to the client for authenticated API calls.
     * 
     * @param session - The session object
     * @param token - The JWT token with user data
     * @returns Session object with user ID and access token
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || token.id;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
