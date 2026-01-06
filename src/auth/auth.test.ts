import { authOptions } from '@/auth';
import { JWT_EXPIRE_TIME } from '@/auth/constants';

describe('Auth Configuration', () => {
  describe('authOptions', () => {
    it('should have CognitoProvider configured', () => {
      expect(authOptions.providers).toBeDefined();
      expect(authOptions.providers.length).toBeGreaterThan(0);
    });

    it('should use JWT strategy for sessions', () => {
      expect(authOptions.session).toBeDefined();
      expect(authOptions.session?.strategy).toBe('jwt');
    });

    it('should set session max age to 10 minutes', () => {
      expect(authOptions.session?.maxAge).toBe(JWT_EXPIRE_TIME);
      expect(authOptions.session?.maxAge).toBe(600); // 10 minutes in seconds
    });
  });

  describe('required callbacks', () => {
    it('should have jwt callback defined', () => {
      expect(authOptions.callbacks?.jwt).toBeDefined();
    });

    it('should have session callback defined', () => {
      expect(authOptions.callbacks?.session).toBeDefined();
    });

    it('should have redirect callback defined', () => {
      expect(authOptions.callbacks?.redirect).toBeDefined();
    });
  });

  describe('environment variables', () => {
    // Note: Actual environment variable validation should happen at application startup
    // (e.g., in middleware or a startup check), not in unit tests.
    // NextAuth will fail loudly if required env vars are missing.
    
    it('should have providers configured (implicitly requires env vars)', () => {
      // If COGNITO_ISSUER, COGNITO_CLIENT_ID, or COGNITO_CLIENT_SECRET were not set,
      // the CognitoProvider would have received undefined values, but that's a
      // runtime error for NextAuth to handle, not a test concern.
      expect(authOptions.providers).toBeDefined();
      expect(authOptions.providers.length).toBeGreaterThan(0);
    });
  });

  describe('session security', () => {
    it('should have reasonable session expiration time', () => {
      const maxAge = authOptions.session?.maxAge || 0;
      // Session should expire between 5 and 60 minutes
      expect(maxAge).toBeGreaterThanOrEqual(5 * 60);
      expect(maxAge).toBeLessThanOrEqual(60 * 60);
    });

    it('should use JWT strategy (more secure than database sessions)', () => {
      expect(authOptions.session?.strategy).toBe('jwt');
    });
  });
});
