import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT_EXPIRE_TIME } from './constants';

/**
 * Mock NextAuth.js configuration for development and testing without AWS Cognito.
 * 
 * Provides a CredentialsProvider that accepts any email/password combination,
 * allowing you to test authentication flows without setting up Cognito infrastructure.
 * Mirrors the behavior of the production Cognito configuration.
 * 
 * @remarks
 * **Provider**: CredentialsProvider (accepts any valid email/password)
 * **Session**: JWT strategy with 10-minute expiration (same as production)
 * **Tokens**: Generates mock access and ID tokens for testing
 * 
 * @example
 * ```typescript
 * // Swap in your API route for development
 * import NextAuth from "next-auth";
 * import { mockAuthOptions } from "@/auth";
 * 
 * const handler = NextAuth(mockAuthOptions);
 * export { handler as GET, handler as POST };
 * ```
 * 
 * @example
 * ```typescript
 * // Test credentials (any email/password works)
 * email: "test@example.com"
 * password: "password123"
 * ```
 * 
 * @security
 * **WARNING**: This configuration uses a hardcoded secret and should NEVER be used in production.
 * Only use for local development and automated testing.
 * 
 * @see {@link https://next-auth.js.org/configuration/providers/credentials Credentials Provider Docs}
 */
export const mockAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials (Mock)',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      /**
       * Mock authorization function that accepts any valid email/password.
       * 
       * @param credentials - Email and password from sign-in form
       * @returns Mock user object with generated ID, or null if credentials invalid
       */
      async authorize(credentials) {
        // Mock user for testing - any email/password combo works
        if (credentials?.email && credentials?.password) {
          return {
            id: `mock-user-${Math.random().toString(36).substr(2, 9)}`,
            email: credentials.email,
            name: credentials.email.split('@')[0],
          };
        }
        return null;
      },
    }),
  ],
  session: { 
    strategy: 'jwt',
    maxAge: JWT_EXPIRE_TIME, // 10 minutes
  },
  callbacks: {
    /**
     * Mock JWT callback - generates fake access and ID tokens.
     * 
     * Creates random token strings to simulate Cognito token behavior
     * for testing authenticated API calls.
     * 
     * @param token - JWT token object
     * @param account - Mock account data
     * @param user - Mock user data
     * @returns JWT with mock access token and ID token
     */
    async jwt({ token, account, user }) {
      if (account) {
        token.iat = Math.floor(Date.now() / 1000);
        token.exp = token.iat + JWT_EXPIRE_TIME; // 10 minutes
        token.accessToken = 'mock-access-token-' + Math.random().toString(36).substr(2, 9);
        token.idToken = 'mock-id-token-' + Math.random().toString(36).substr(2, 9);
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    /**
     * Mock session callback - maps mock token data to session.
     * 
     * Mirrors production session behavior for testing components
     * that depend on useSession() hook.
     * 
     * @param session - Session object
     * @param token - Mock JWT token
     * @returns Session with user ID and mock access token
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || token.id || '';
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    /**
     * Mock redirect callback - redirects to dashboard after sign-in.
     * 
     * Identical to production behavior for consistent testing.
     * 
     * @param baseUrl - Application base URL
     * @returns Dashboard URL path
     */
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  secret: 'mock-secret-for-development-only-do-not-use-in-production',
};
