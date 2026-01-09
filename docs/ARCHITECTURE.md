# NLCC Food Hub - Architecture & Project Structure

## Overview

NLCC Food Hub is a **Next.js 16** dashboard application designed for FoodHub distribution and organization management. It features role-based authentication, multi-section dashboards for volunteers, events, inventory, engagement, and history tracking.

**Current Branch:** `66-feature-mock-authentication-implementation`

---

## Technology Stack

### Core Framework
- **Next.js 16.0.8** - React-based full-stack framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe development

### UI & Styling
- **TailwindCSS 4** - Utility-first CSS framework
- **Tailwind Merge** - Utility class merging
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-label` - Form labels
  - `@radix-ui/react-slot` - Composition utilities
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management

### Authentication
- **NextAuth.js 4.24.13** - Authentication framework
- **AWS Cognito** - Identity provider
  - `@aws-sdk/client-cognito-identity-provider` - AWS SDK integration
- **OpenID Client** - OIDC support

### Data & Visualization
- **Recharts 3.5.1** - React chart library
- **date-fns 4.1.0** - Date utilities
- **react-day-picker** - Calendar component

### Development & Testing
- **Jest 30.2.0** - Unit testing framework
- **Vitest 4.0.14** - Alternative test runner
- **Storybook 10.1.10** - Component development environment
- **Chromatic** - Visual testing & deployment
- **ESLint 9** - Code quality
- **Prettier 3.7.4** - Code formatting
- **Playwright 1.57.0** - E2E testing

---

## Project Structure

```
foodhub/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── api/                      # API routes
│   │   ├── components/               # Reusable React components
│   │   │   ├── atoms/               # Small, single-responsibility components (Button, Input, etc.)
│   │   │   ├── molecules/           # Composed from atoms (FormField, Card, etc.)
│   │   │   ├── organisms/           # Complex components (Navigation, Forms, etc.)
│   │   │   ├── pages/               # Page-level components
│   │   │   └── templates/           # Layout templates
│   │   ├── dashboard/               # Dashboard pages
│   │   │   ├── engagement/          # Engagement metrics dashboard
│   │   │   ├── events/              # Events management
│   │   │   ├── history/             # Historical data & logs
│   │   │   ├── inventory/           # Inventory management
│   │   │   └── volunteers/          # Volunteer management
│   │   ├── shared/                  # Shared layouts & utilities
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── providers.tsx            # Context providers (Auth, Theme, etc.)
│   │   └── globals.css              # Global styles
│   │
│   ├── auth/                         # Authentication module
│   │   ├── auth.ts                  # Production Cognito auth config
│   │   ├── auth.mock.ts             # Mock auth for development/testing
│   │   ├── config.ts                # Feature flags & configuration
│   │   ├── constants.ts             # Auth constants (JWT expiry, etc.)
│   │   ├── types.ts                 # Type definitions
│   │   ├── index.ts                 # Main export with getAuthOptions()
│   │   ├── hooks/                   # Auth-related hooks
│   │   ├── auth.test.ts             # Auth unit tests
│   │   └── auth.mock.ts             # Mock tests
│   │
│   └── lib/
│       └── utils.ts                 # Shared utility functions
│
├── public/                           # Static assets
├── coverage/                         # Test coverage reports
├── storybook-static/                # Built Storybook files
│
├── Configuration Files
│   ├── tsconfig.json               # TypeScript configuration
│   ├── jest.config.ts              # Jest testing configuration
│   ├── vitest.config.ts            # Vitest configuration
│   ├── next.config.ts              # Next.js configuration
│   ├── babel.config.js             # Babel configuration
│   ├── postcss.config.mjs           # PostCSS configuration
│   ├── tailwind.config.ts           # Tailwind configuration
│   ├── eslint.config.mjs            # ESLint rules
│   ├── package.json                # Project dependencies
│   └── README.md                   # Default project readme
```

---

## Authentication System

### Overview
The application supports **two authentication modes** controlled by feature flags:
1. **Production Mode** - AWS Cognito integration
2. **Development/Testing Mode** - Mock authentication

### Feature Flag Configuration
Controlled via environment variables:
- `USE_MOCK_AUTH` (private)
- `NEXT_PUBLIC_USE_MOCK_AUTH` (client-accessible)

### Key Files

#### [src/auth/index.ts](src/auth/index.ts)
**Main export point**
- `getAuthOptions()` - Returns appropriate auth config based on feature flags
- Exports both `authOptions` and `mockAuthOptions` for flexibility
- Evaluates feature flags once at module load time (non-runtime toggleable)

#### [src/auth/auth.ts](src/auth/auth.ts)
**Production Cognito Configuration**
- Uses `NextAuth.js` with Cognito provider
- JWT-based session strategy
- 1-hour token expiration (configurable via `JWT_EXPIRE_TIME`)
- Automatic token refresh before expiration

**Required Environment Variables:**
```
COGNITO_ISSUER=https://cognito-idp.{region}.amazonaws.com/{region}_{poolId}
COGNITO_CLIENT_ID={your_client_id}
COGNITO_CLIENT_SECRET={your_client_secret}
NEXTAUTH_SECRET={generated_secret}
NEXTAUTH_URL=http://localhost:3000
```

#### [src/auth/auth.mock.ts](../src/auth/auth.mock.ts)
**Mock Authentication for Development**
- Provides fake user sessions for testing without Cognito
- Useful for CI/CD pipelines and local development

#### [src/auth/config.ts](../src/auth/config.ts)
**Feature Flag Management**
- Reads environment variables
- Provides `authFeatureFlags` object
- `getUseMockAuth()` function for runtime checks

#### [src/auth/constants.ts](../src/auth/constants.ts)
**Authentication Constants**
- `JWT_EXPIRE_TIME` - Token expiration time (3600 seconds = 1 hour)

#### [src/auth/types.ts](../src/auth/types.ts)
**Type Definitions**
- Custom types for auth-related data structures

---

## Component Architecture

The project follows **Atomic Design** principles for components:

### Hierarchy
```
Atoms (Basic UI elements)
    ↓
Molecules (Simple combinations)
    ↓
Organisms (Complex components)
    ↓
Templates (Page layouts)
    ↓
Pages (Full page implementations)
```

### Examples
- **Atoms:** Button, Input, Label, Card
- **Molecules:** FormField, Calendar, FilterBar
- **Organisms:** Navigation, Forms, DashboardHeader
- **Templates:** DashboardLayout, AuthTemplate
- **Pages:** EngagementDashboard, EventsManagement

---

## Dashboard Sections

### 1. **Engagement Dashboard** (`/dashboard/engagement`)
- Engagement metrics and analytics
- Skeleton loaders for loading states
- Chart visualizations using Recharts

### 2. **Events** (`/dashboard/events`)
- Event management interface
- Event listing and details
- Event creation/editing

### 3. **Inventory** (`/dashboard/inventory`)
- Inventory status tracking
- Stock level management
- Inventory analytics

### 4. **History** (`/dashboard/history`)
- Historical data logging
- Activity tracking
- Audit trails

### 5. **Volunteers** (`/dashboard/volunteers`)
- Volunteer management
- Volunteer profiles
- Task assignments

---

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start               # Run production build

# Testing
npm test                # Run Jest tests

# Code Quality
npm run lint            # Run ESLint

# Storybook (Component Development)
npm run storybook       # Start Storybook (http://localhost:6006)
npm run build-storybook # Build static Storybook

# Chromatic (Visual Testing)
npm run chromatic       # Push to Chromatic
```

### Environment Setup

Create a `.env.local` file for local development:

**For Production (Cognito):**
```env
COGNITO_ISSUER=https://cognito-idp.{region}.amazonaws.com/{region}_{poolId}
COGNITO_CLIENT_ID={your_client_id}
COGNITO_CLIENT_SECRET={your_client_secret}
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
```

**For Development (Mock Auth):**
```env
USE_MOCK_AUTH=true
NEXTAUTH_SECRET=dev-secret-not-for-production
NEXTAUTH_URL=http://localhost:3000
```

---

## Testing

### Jest
- Unit and integration tests
- Configuration: [jest.config.ts](../jest.config.ts)
- Test files: `*.test.ts`, `*.test.tsx`

### Vitest
- Alternative test runner with better ESM support
- Configuration: [vitest.config.ts](../vitest.config.ts)

### Storybook
- Component-driven development
- Visual testing and documentation
- Addons for A11y, Docs, Theming
- Chromatic integration for CI/CD

### Coverage
- Generated in `coverage/` directory
- Coverage reports available in `coverage/lcov-report/`

---

## Code Quality

### ESLint
- Configuration: [eslint.config.mjs](../eslint.config.mjs)
- Includes Next.js and Storybook plugins
- Run: `npm run lint`

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/*` → `./src/*`)

---

## Styling & CSS

### TailwindCSS 4
- Utility-first CSS framework
- Global styles: [src/app/globals.css](../src/app/globals.css)

### PostCSS
- CSS transformations and optimizations
- Configuration: [postcss.config.mjs](../postcss.config.mjs)

---

## Key Features

✅ **Authentication**
- AWS Cognito integration (production)
- Mock authentication (development)
- JWT-based sessions
- Automatic token refresh

✅ **Dashboard**
- Multi-section dashboard system
- Real-time data visualization
- Responsive design

✅ **Component System**
- Reusable component library
- Storybook documentation
- Atomic design principles

✅ **Testing**
- Unit tests with Jest
- Component testing with Vitest
- Visual testing with Chromatic

✅ **Type Safety**
- Full TypeScript support
- Strict mode enabled

---

## Environment Variables Reference

| Variable | Scope | Purpose | Example |
|----------|-------|---------|---------|
| `USE_MOCK_AUTH` | Private | Enable mock auth (server-side) | `true` / `false` |
| `NEXT_PUBLIC_USE_MOCK_AUTH` | Public | Enable mock auth (client-side) | `true` / `false` |
| `COGNITO_ISSUER` | Private | Cognito issuer URL | `https://cognito-idp.us-east-1.amazonaws.com/...` |
| `COGNITO_CLIENT_ID` | Private | Cognito app client ID | - |
| `COGNITO_CLIENT_SECRET` | Private | Cognito app client secret | - |
| `NEXTAUTH_SECRET` | Private | NextAuth encryption secret | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Private | Application callback URL | `http://localhost:3000` |

---

## Current Development Status

- **Branch:** `66-feature-mock-authentication-implementation`
- **Focus:** Mock authentication implementation for development and testing
- **Status:** Active development

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [AWS Cognito Docs](https://docs.aws.amazon.com/cognito/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Storybook Docs](https://storybook.js.org/docs)
