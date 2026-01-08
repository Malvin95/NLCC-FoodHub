/**
 * Feature flag configuration for authentication.
 * 
 * This module controls which authentication provider is used based on feature flags.
 * 
 * @remarks
 * - `USE_MOCK_AUTH`: When true, uses mock authentication (CredentialsProvider)
 * - Default behavior: Reads from environment variable, falls back to false
 * 
 * @example
 * ```bash
 * # Enable mock authentication
 * NEXT_PUBLIC_USE_MOCK_AUTH=true npm run dev
 * ```
 */

/**
 * Determines if mock authentication should be used instead of Cognito
 * 
 * Checks the following in order:
 * 1. `NEXT_PUBLIC_USE_MOCK_AUTH` environment variable (for client-side and build-time)
 * 2. `USE_MOCK_AUTH` environment variable (for server-side)
 * 3. Defaults to `false` (uses production Cognito authentication)
 */
export const getUseMockAuth = (): boolean => {
  let useMockAuth = false;

  // Check NEXT_PUBLIC_ prefixed env var first (available at build time)
  if (process.env.NEXT_PUBLIC_USE_MOCK_AUTH) {
    useMockAuth = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true';
  } else if (process.env.USE_MOCK_AUTH) {
    // Check non-public env var (server-side only)
    useMockAuth = process.env.USE_MOCK_AUTH === 'true';
  }

  // Safeguard: prevent mock authentication from being enabled in production  
  if (  
    useMockAuth &&  
    typeof process !== 'undefined' &&  
    process.env.NODE_ENV === 'production'  
  ) {  
    throw new Error(  
      'Mock authentication is enabled while NODE_ENV is "production". ' +  
      'Disable USE_MOCK_AUTH/NEXT_PUBLIC_USE_MOCK_AUTH in production environments.'  
    );  
  }  

  // Default to production authentication when not explicitly enabled  
  return useMockAuth;
};

/**
 * Feature flags for authentication
 */
export const authFeatureFlags = {
  /**
   * Use mock authentication instead of AWS Cognito
   * 
   * Set via environment variables:
   * - `NEXT_PUBLIC_USE_MOCK_AUTH=true` (recommended for development)
   * - `USE_MOCK_AUTH=true` (for server-side only)
   */
  useMockAuth: getUseMockAuth(),
};
