import { authOptions } from './auth';
import { mockAuthOptions } from './auth.mock';
import { authFeatureFlags } from './config';

/**
 * Get the appropriate authentication options based on feature flags.
 * 
 * Returns mock authentication if `USE_MOCK_AUTH` or `NEXT_PUBLIC_USE_MOCK_AUTH`
 * environment variable is set to 'true', otherwise uses production Cognito auth.
 * 
 * @note The feature flag is evaluated once at module load time. Changes to environment
 * variables after the application has started will not take effect without restarting
 * the application. This is by design and cannot be toggled at runtime.
 * 
 * @example
 * ```typescript
 * import { getAuthOptions } from "@/auth";
 * 
 * const handler = NextAuth(getAuthOptions());
 * export { handler as GET, handler as POST };
 * ```
 * 
 * @returns {AuthOptions} The authentication options object, either mock or production
 */
export const getAuthOptions = () => {
  return authFeatureFlags.useMockAuth ? mockAuthOptions : authOptions;
};

// Direct exports for backward compatibility and explicit use
export { authOptions } from './auth';
export { mockAuthOptions } from './auth.mock';
export { JWT_EXPIRE_TIME } from './constants';
export { authFeatureFlags, getUseMockAuth } from './config';
