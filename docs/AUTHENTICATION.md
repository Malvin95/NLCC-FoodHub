# NLCC Food Hub - Authentication Guide

## Overview

The NLCC Food Hub supports two authentication modes:
1. **Mock Authentication** - For development and testing (no AWS account required)
2. **AWS Cognito** - For production environments with real user management

The authentication system is built with **NextAuth.js 4** and can be switched between modes using **feature flags**.

---

## Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Application                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │  NextAuth.js (SSR)  │
                    └─────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │ Feature Flag Check  │
                    └─────────────────────┘
                         ↙           ↘
            ┌──────────────┐    ┌──────────────┐
            │ USE_MOCK_AUTH │    │ AWS Cognito  │
            │     = true    │    │              │
            └──────────────┘    └──────────────┘
```

---

## Session Strategy

### JWT-Based Sessions

The application uses **JWT (JSON Web Tokens)** for session management:

```
┌──────────────┐
│  User Login  │
└──────────────┘
       ↓
┌──────────────────────────┐
│  Generate/Fetch JWT      │
│  - Access Token          │
│  - Refresh Token         │
│  - ID Token (Cognito)    │
└──────────────────────────┘
       ↓
┌──────────────────────────┐
│ Store in HTTP-Only Cookie│
│ (Secure, SameSite)       │
└──────────────────────────┘
       ↓
┌──────────────────────────┐
│  API Requests with JWT   │
│  Auto-refresh before exp │
└──────────────────────────┘
```

**Key Features:**
- ✅ HTTP-only cookies (prevents XSS attacks)
- ✅ Automatic token refresh
- ✅ 1-hour token expiration (configurable)
- ✅ SameSite protection

---

## Feature Flags

### Configuration Priority

The authentication mode is determined at **module load time** and follows this priority:

1. **`USE_MOCK_AUTH`** environment variable (server-side)
2. **`NEXT_PUBLIC_USE_MOCK_AUTH`** environment variable (client-side)
3. **Default:** Production (AWS Cognito)

### Setting Feature Flags

**`.env.local` - Development (Mock Auth)**
```env
USE_MOCK_AUTH=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

**`.env.production` - Production (Cognito)**
```env
USE_MOCK_AUTH=false
COGNITO_ISSUER=...
COGNITO_CLIENT_ID=...
```

### Important Note
⚠️ **Feature flags are evaluated once at module load time.** Changes to environment variables after the application has started will NOT take effect without restarting the application. This is intentional for security and stability.

---

## Development: Mock Authentication

### What is Mock Auth?

Mock authentication provides a fake authentication system for development and testing without requiring AWS Cognito credentials.

### Configuration

**1. Set environment variables:**
```env
USE_MOCK_AUTH=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
NEXTAUTH_SECRET=dev-secret-key
NEXTAUTH_URL=http://localhost:3000
```

**2. No additional setup required!**

### Using Mock Auth

#### Login
- Open http://localhost:3000
- Click "Sign In" (or navigate to login page)
- Enter any email and password
- You'll be authenticated with a mock user session

#### Mock User Data
```typescript
{
  id: "mock-user-id",
  email: "user@example.com",
  name: "Mock User",
  image: null
}
```

#### Mock Tokens
- Access Token: Valid mock token
- Refresh Token: Valid mock token
- Expires in: 1 hour (configurable)

### File: [src/auth/auth.mock.ts](src/auth/auth.mock.ts)

Contains the mock authentication configuration:
```typescript
export const mockAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Mock credentials
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // Mock JWT and session logic
  },
};
```

### When to Use Mock Auth
✅ Local development
✅ Unit and integration testing
✅ CI/CD pipelines
✅ Demo environments
✅ Feature development without AWS account

---

## Production: AWS Cognito

### What is AWS Cognito?

AWS Cognito is a fully managed authentication and authorization service that handles:
- User sign-up and sign-in
- Password management
- Multi-factor authentication (MFA)
- Social identity provider integration
- User attribute management

### Prerequisites

1. **AWS Account** - With appropriate IAM permissions
2. **AWS CLI** (optional) - For easier configuration
3. **Cognito User Pool** - Created and configured

### Setup Steps

#### Step 1: Create Cognito User Pool

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Navigate to **Cognito** → **User Pools**
3. Click **Create user pool**
4. Choose authentication methods (Email, Phone, Username, etc.)
5. Set password policy
6. Click **Create**

#### Step 2: Create App Client

1. In your User Pool → **App integration** → **App clients and analytics**
2. Click **Create app client**
3. Set app client name: `foodhub-client`
4. **Authentication flows:** Enable "ALLOW_USER_PASSWORD_AUTH"
5. **OAuth 2.0 settings:**
   - Allowed redirect URIs: `http://localhost:3000/api/auth/callback/cognito`
   - Allowed sign-out URIs: `http://localhost:3000`
   - Allowed OAuth Scopes: `openid`, `profile`, `email`
6. Click **Create**

#### Step 3: Gather Configuration

From your User Pool:

1. **User Pool ID:** Settings → General settings
   - Example: `us-east-1_xxxxx`

2. **Region:** Visible in User Pool URL
   - Example: `us-east-1`

3. **Client ID & Secret:** App clients → Your app client
   - Example: `abc123xyz...`

4. **Issuer URL:** `https://cognito-idp.{region}.amazonaws.com/{region}_{poolId}`

#### Step 4: Configure Environment

Create `.env.local`:

```env
# AWS Cognito Configuration
COGNITO_ISSUER=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxx
COGNITO_CLIENT_ID=abc123xyz...
COGNITO_CLIENT_SECRET=def456uvw...

# NextAuth Configuration
NEXTAUTH_SECRET=generated_secret_key
NEXTAUTH_URL=http://localhost:3000

# Feature Flags
USE_MOCK_AUTH=false
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

#### Step 5: Test Connection

1. Start dev server: `npm run dev`
2. Navigate to http://localhost:3000
3. Click "Sign In"
4. You should be redirected to Cognito login
5. Sign in with a Cognito user account
6. Should redirect back to dashboard

### Production Deployment

**Set environment variables in your deployment platform:**

- Vercel → Project Settings → Environment Variables
- AWS → Secrets Manager or Parameter Store
- Docker → `.env` file or environment variables
- Kubernetes → Secrets or ConfigMaps

**Update OAuth Redirect URIs:**
1. Go to Cognito App Client settings
2. Add production URL: `https://yourdomain.com/api/auth/callback/cognito`
3. Add sign-out URL: `https://yourdomain.com`

### File: [src/auth/auth.ts](src/auth/auth.ts)

Contains the Cognito authentication configuration:

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      issuer: process.env.COGNITO_ISSUER,
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt", maxAge: JWT_EXPIRE_TIME },
  callbacks: {
    async jwt({ token, account }) {
      // Handle token refresh
    },
    async session({ session, token }) {
      // Expose user data to session
    },
  },
};
```

---

## Using Authentication in Your Code

### Server-Side (API Routes)

```typescript
// src/app/api/protected/route.ts
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/auth";

export async function GET() {
  const session = await getServerSession(getAuthOptions());
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // session.user contains: id, email, name, image
  // session.accessToken contains JWT token
  return Response.json({ data: "Protected resource" });
}
```

### Client-Side (React Components)

```typescript
// src/app/components/atoms/AuthButton.tsx
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }

  return <button onClick={() => signIn()}>Sign In</button>;
}
```

### Protected Routes

```typescript
// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(getAuthOptions());

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <div>Welcome to the dashboard!</div>;
}
```

### Custom Hooks

Create custom authentication hooks:

```typescript
// src/auth/hooks/useAuth.ts
import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    accessToken: (session as any)?.accessToken,
  };
}
```

Usage:
```typescript
const { user, isAuthenticated, accessToken } = useAuth();
```

---

## Token Refresh

### Automatic Refresh

Tokens are automatically refreshed **before expiration**:

1. **JWT Callback:** Checks token expiration
2. **Token Expired?** Yes → Fetch refresh token from Cognito
3. **Update Session:** New token is stored
4. **Transparent:** User doesn't know refresh happened

### Configuration

Token expiration time is set in [src/auth/constants.ts](src/auth/constants.ts):

```typescript
export const JWT_EXPIRE_TIME = 3600; // 1 hour in seconds
```

To change:
```typescript
export const JWT_EXPIRE_TIME = 7200; // 2 hours
```

### Manual Refresh

If needed, manually trigger a session refresh:

```typescript
import { signIn } from "next-auth/react";

// Force session refresh
await signIn(undefined, { redirect: false });
```

---

## Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` or `.env` files
- ✅ Use `.gitignore` to exclude environment files
- ✅ Use secret management in production
- ✅ Rotate secrets regularly

### Tokens
- ✅ Always use HTTPS in production
- ✅ Store tokens in HTTP-only cookies (default)
- ✅ Set SameSite=Strict for cookies
- ✅ Implement token refresh before expiration

### API Calls
- ✅ Always validate session on the backend
- ✅ Implement CSRF protection
- ✅ Use rate limiting
- ✅ Log authentication events

### Cognito
- ✅ Enable MFA for production users
- ✅ Implement password policies
- ✅ Use IAM roles with minimal permissions
- ✅ Monitor CloudTrail for suspicious activity

---

## Troubleshooting

### "NEXTAUTH_SECRET is not set"

**Error:**
```
Error: [next-auth][error][NO_SECRET]: Please define a `secret` or set the `NEXTAUTH_SECRET` environment variable.
```

**Solution:**
1. Generate secret: `openssl rand -base64 32`
2. Add to `.env.local`: `NEXTAUTH_SECRET=generated_value`
3. Restart dev server

### "Invalid Cognito credentials"

**Check:**
1. Verify `COGNITO_ISSUER` is correct format
2. Confirm `COGNITO_CLIENT_ID` and `COGNITO_CLIENT_SECRET`
3. Ensure redirect URIs are configured in Cognito
4. Check CloudWatch logs for Cognito errors

### "Session is null"

**Verify:**
1. `.env.local` exists with NEXTAUTH configuration
2. Application restarted after env changes
3. Correct auth provider is selected
4. User is logged in

### "Redirect loop on sign-in"

**Check:**
1. Callback URLs configured correctly
2. `NEXTAUTH_URL` matches your domain
3. Check browser cookies (should have `next-auth.session-token`)
4. Review NextAuth logs

### "Token refresh failing"

**Verify:**
1. `COGNITO_ISSUER` is accessible
2. Credentials are still valid
3. Check Cognito user pool status
4. Review CloudWatch logs

---

## Testing Authentication

### Unit Tests

```typescript
// src/auth/auth.test.ts
import { getAuthOptions } from "@/auth";

describe("Authentication", () => {
  it("should return mock auth when flag is true", () => {
    process.env.USE_MOCK_AUTH = "true";
    const options = getAuthOptions();
    expect(options.providers).toBeDefined();
  });

  it("should return cognito auth when flag is false", () => {
    process.env.USE_MOCK_AUTH = "false";
    const options = getAuthOptions();
    expect(options.providers).toBeDefined();
  });
});
```

### Integration Tests

```typescript
// Test sign-in flow
it("should authenticate user", async () => {
  const response = await signIn("credentials", {
    email: "test@example.com",
    password: "password",
    redirect: false,
  });

  expect(response?.ok).toBe(true);
});
```

### E2E Tests (with Playwright)

```typescript
test("should sign in and access dashboard", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.click("button:has-text('Sign In')");
  
  await page.fill('input[type="email"]', "test@example.com");
  await page.fill('input[type="password"]', "password");
  await page.click("button:has-text('Submit')");
  
  await page.waitForURL("/dashboard");
  expect(page.url()).toContain("/dashboard");
});
```

---

## References

- [NextAuth.js Documentation](https://next-auth.js.org)
- [NextAuth.js Cognito Provider](https://next-auth.js.org/providers/cognito)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
