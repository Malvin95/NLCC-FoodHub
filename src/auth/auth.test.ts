import { authOptions, mockAuthOptions, getAuthOptions, getUseMockAuth } from '@/auth';
import { JWT_EXPIRE_TIME } from '@/auth/constants';

describe('Auth Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Save original environment
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('authOptions (Production Cognito)', () => {
    it('should have CognitoProvider configured', () => {
      expect(authOptions.providers).toBeDefined();
      expect(authOptions.providers.length).toBeGreaterThan(0);
    });

    it('should use JWT strategy for sessions', () => {
      expect(authOptions.session).toBeDefined();
      expect(authOptions.session?.strategy).toBe('jwt');
    });

    it('should set session max age to 1 hour', () => {
      expect(authOptions.session?.maxAge).toBe(JWT_EXPIRE_TIME);
      expect(authOptions.session?.maxAge).toBe(3600); // 1 hour in seconds
    });
  });

  describe('mockAuthOptions', () => {
    it('should have CredentialsProvider configured', () => {
      expect(mockAuthOptions.providers).toBeDefined();
      expect(mockAuthOptions.providers.length).toBeGreaterThan(0);
    });

    it('should use JWT strategy for sessions', () => {
      expect(mockAuthOptions.session).toBeDefined();
      expect(mockAuthOptions.session?.strategy).toBe('jwt');
    });

    it('should set session max age to 1 hour (same as production)', () => {
      expect(mockAuthOptions.session?.maxAge).toBe(JWT_EXPIRE_TIME);
      expect(mockAuthOptions.session?.maxAge).toBe(3600);
    });
  });

  describe('getUseMockAuth feature flag', () => {
    it('should return false by default when no env vars are set', () => {
      delete process.env.NEXT_PUBLIC_USE_MOCK_AUTH;
      delete process.env.USE_MOCK_AUTH;
      
      const result = getUseMockAuth();
      expect(result).toBe(false);
    });

    it('should return true when NEXT_PUBLIC_USE_MOCK_AUTH is set to "true"', () => {
      process.env.NEXT_PUBLIC_USE_MOCK_AUTH = 'true';
      delete process.env.USE_MOCK_AUTH;
      
      const result = getUseMockAuth();
      expect(result).toBe(true);
    });

    it('should return false when NEXT_PUBLIC_USE_MOCK_AUTH is set to "false"', () => {
      process.env.NEXT_PUBLIC_USE_MOCK_AUTH = 'false';
      delete process.env.USE_MOCK_AUTH;
      
      const result = getUseMockAuth();
      expect(result).toBe(false);
    });

    it('should return true when USE_MOCK_AUTH is set to "true"', () => {
      delete process.env.NEXT_PUBLIC_USE_MOCK_AUTH;
      process.env.USE_MOCK_AUTH = 'true';
      
      const result = getUseMockAuth();
      expect(result).toBe(true);
    });

    it('should prioritize NEXT_PUBLIC_USE_MOCK_AUTH over USE_MOCK_AUTH', () => {
      process.env.NEXT_PUBLIC_USE_MOCK_AUTH = 'true';
      process.env.USE_MOCK_AUTH = 'false';
      
      const result = getUseMockAuth();
      expect(result).toBe(true);
    });
  });

  describe('getAuthOptions', () => {
    it('should return mockAuthOptions when USE_MOCK_AUTH is enabled', () => {
      process.env.NEXT_PUBLIC_USE_MOCK_AUTH = 'true';
      
      const options = getAuthOptions();
      expect(options).toEqual(mockAuthOptions);
    });

    it('should return authOptions when USE_MOCK_AUTH is disabled', () => {
      process.env.NEXT_PUBLIC_USE_MOCK_AUTH = 'false';
      delete process.env.USE_MOCK_AUTH;
      
      const options = getAuthOptions();
      expect(options).toEqual(authOptions);
    });

    it('should return authOptions by default', () => {
      delete process.env.NEXT_PUBLIC_USE_MOCK_AUTH;
      delete process.env.USE_MOCK_AUTH;
      
      const options = getAuthOptions();
      expect(options).toEqual(authOptions);
    });
  });

  describe('required callbacks', () => {
    it('should have jwt callback defined in authOptions', () => {
      expect(authOptions.callbacks?.jwt).toBeDefined();
    });

    it('should have session callback defined in authOptions', () => {
      expect(authOptions.callbacks?.session).toBeDefined();
    });

    it('should have jwt callback defined in mockAuthOptions', () => {
      expect(mockAuthOptions.callbacks?.jwt).toBeDefined();
    });

    it('should have session callback defined in mockAuthOptions', () => {
      expect(mockAuthOptions.callbacks?.session).toBeDefined();
    });
  });

  describe('session security', () => {
    it('should have reasonable session expiration time in authOptions', () => {
      const maxAge = authOptions.session?.maxAge || 0;
      // Session should expire between 5 and 60 minutes
      expect(maxAge).toBeGreaterThanOrEqual(5 * 60);
      expect(maxAge).toBeLessThanOrEqual(60 * 60);
    });

    it('should have reasonable session expiration time in mockAuthOptions', () => {
      const maxAge = mockAuthOptions.session?.maxAge || 0;
      // Session should expire between 5 and 60 minutes
      expect(maxAge).toBeGreaterThanOrEqual(5 * 60);
      expect(maxAge).toBeLessThanOrEqual(60 * 60);
    });

    it('should use JWT strategy (more secure than database sessions)', () => {
      expect(authOptions.session?.strategy).toBe('jwt');
      expect(mockAuthOptions.session?.strategy).toBe('jwt');
    });
  });
});
