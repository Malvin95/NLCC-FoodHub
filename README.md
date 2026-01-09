# NLCC Food Hub Dashboard

A comprehensive dashboard application for FoodHub distribution and organization management, built with Next.js 16, TypeScript, and AWS Cognito authentication.

## ✨ Features

- 🔐 **Flexible Authentication** - AWS Cognito integration with mock auth for development
- 📊 **Multi-Section Dashboard** - Engagement, Events, Inventory, History, and Volunteers
- 🎨 **Component Library** - Built with Atomic Design principles and Storybook
- 🧪 **Comprehensive Testing** - Jest, Vitest, and Chromatic visual testing
- 🎯 **Type-Safe** - Full TypeScript support with strict mode
- 🚀 **Modern Stack** - Next.js 16, React 19, TailwindCSS 4

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or higher
- npm 9.0+ (or yarn/pnpm)

### 1. Clone and Install

```bash
git clone https://github.com/Malvin95/NLCC-FoodHub.git
cd NLCC-FoodHub
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the root directory:

**For Development (Recommended for quick start):**

```env
# Use mock authentication (no AWS account needed)
USE_MOCK_AUTH=true
NEXT_PUBLIC_USE_MOCK_AUTH=true

# NextAuth Configuration
NEXTAUTH_SECRET=dev-secret-not-for-production
NEXTAUTH_URL=http://localhost:3000
```

**For Production (AWS Cognito):**

```env
# AWS Cognito Configuration
COGNITO_ISSUER=https://cognito-idp.{region}.amazonaws.com/{region}_{poolId}
COGNITO_CLIENT_ID=your_client_id
COGNITO_CLIENT_SECRET=your_client_secret

# NextAuth Configuration
NEXTAUTH_SECRET=your_generated_secret  # Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Start Storybook (Optional)

```bash
npm run storybook
```

View component library at [http://localhost:6006](http://localhost:6006)

## 📖 Documentation

For detailed documentation, see:

- **[SETUP.md](docs/SETUP.md)** - Complete installation and configuration guide
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Project structure and technology stack
- **[AUTHENTICATION.md](docs/AUTHENTICATION.md)** - Auth system and AWS Cognito setup
- **[COMPONENTS.md](docs/COMPONENTS.md)** - Component development guide

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm test             # Run tests
npm run lint         # Run ESLint
npm run storybook    # Start Storybook
npm run chromatic    # Visual testing with Chromatic
```

## 🏗️ Project Structure

```
foodhub/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── components/        # React components (Atomic Design)
│   │   │   ├── atoms/        # Basic UI elements
│   │   │   ├── molecules/    # Simple combinations
│   │   │   ├── organisms/    # Complex components
│   │   │   ├── templates/    # Page layouts
│   │   │   └── pages/        # Page components
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── engagement/
│   │   │   ├── events/
│   │   │   ├── history/
│   │   │   ├── inventory/
│   │   │   └── volunteers/
│   │   └── shared/            # Shared utilities
│   ├── auth/                   # Authentication module
│   │   ├── auth.ts            # Cognito configuration
│   │   ├── auth.mock.ts       # Mock auth for development
│   │   └── config.ts          # Feature flags
│   └── lib/                    # Utility functions
├── public/                     # Static assets
└── [config files]             # TypeScript, Jest, ESLint, etc.
```

## 🔐 Authentication

This project supports two authentication modes:

### Development Mode (Mock Auth)
- **Use when:** Local development, testing, CI/CD
- **Setup:** Set `USE_MOCK_AUTH=true` in `.env.local`
- **Benefits:** No AWS account needed, instant setup

### Production Mode (AWS Cognito)
- **Use when:** Staging, production environments
- **Setup:** Configure AWS Cognito credentials in `.env.local`
- **Benefits:** Enterprise-grade security, real user management

See [AUTHENTICATION.md](docs/AUTHENTICATION.md) for detailed setup instructions.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

## 📦 Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript 5
- **UI:** React 19, TailwindCSS 4, Radix UI
- **Auth:** NextAuth.js 4, AWS Cognito
- **Charts:** Recharts
- **Testing:** Jest, Vitest, Playwright
- **Storybook:** Component development & documentation
- **Code Quality:** ESLint, Prettier

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run tests: `npm test`
4. Commit: `git commit -m "feat: your feature description"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## 📝 License

This project is private and proprietary.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
