# NLCC Food Hub

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## AWS Cognito Authentication

The app supports sign-in via AWS Cognito using NextAuth v5.

### 1) Create Cognito Resources

- **User Pool**: Create a user pool (email as username recommended).
- **Domain**: Set a hosted UI domain (e.g., `your-domain.auth.us-east-1.amazoncognito.com`).
- **App Client**: Create a web app client.
  - Enable OAuth flows: `Authorization code grant` and `Implicit grant`.
  - For **public clients** (recommended for SPAs): Do NOT enable client authentication.
  - For **confidential clients**: Enable client secret generation.
- **Allowed Callback URLs**: Add `http://localhost:3000/api/auth/callback/cognito`
- **Allowed Logout URLs**: Add `http://localhost:3000`

### 2) Configure Environment Variables

Add these to `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
# Generate via: openssl rand -base64 32
NEXTAUTH_SECRET=your_random_secret_here

COGNITO_ISSUER=https://your-domain.auth.your-region.amazoncognito.com
COGNITO_CLIENT_ID=your_cognito_client_id_here
COGNITO_CLIENT_SECRET=your_cognito_client_secret_here  # omit if using public client
```

### 3) Install Dependencies & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), click **Sign in**, and you'll be redirected to the Cognito hosted UI.

The `/dashboard` page requires authentication and will redirect unauthenticated users to sign in.

### Key Files

- `src/auth.ts` – NextAuth configuration with Cognito provider
- `src/app/api/auth/[...nextauth]/route.ts` – NextAuth API route
- `src/app/providers.tsx` – SessionProvider wrapper
- `src/app/components/AuthButtons.tsx` – Sign in/out UI component
- `src/app/shared/RequireAuth.tsx` – Middleware to protect routes

### Production Deployment

When deploying to production (e.g., Vercel):
1. Update `NEXTAUTH_URL` to your production domain
2. Update Cognito callback/logout URLs to match production domain
3. Generate a new `NEXTAUTH_SECRET` for production

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [NextAuth Documentation](https://nextauth.js.org/) - authentication for Next.js.
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/) - user pool setup & management.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
