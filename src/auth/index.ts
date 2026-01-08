import { authOptions } from './auth';
import { mockAuthOptions } from './auth.mock';
import { authFeatureFlags } from './config';

/**
 * Get the appropriate authentication options based on feature flags.
 * 
 * Returns mock authentication if `USE_MOCK_AUTH` or `NEXT_PUBLIC_USE_MOCK_AUTH`
 * environment variable is set to 'true', otherwise uses production Cognito auth.
 * 
 * @example
 * ```typescript
 * import { getAuthOptions } from "@/auth";
 * 
 * const handler = NextAuth(getAuthOptions());
 * export { handler as GET, handler as POST };
 * ```
 */
export const getAuthOptions = () => {
  return authFeatureFlags.useMockAuth ? mockAuthOptions : authOptions;
};

// Direct exports for backward compatibility and explicit use
export { authOptions } from './auth';
export { mockAuthOptions } from './auth.mock';
export { JWT_EXPIRE_TIME } from './constants';
export { authFeatureFlags, getUseMockAuth } from './config';
