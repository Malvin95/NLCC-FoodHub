# NLCC Food Hub - Setup & Installation Guide

## Prerequisites

- **Node.js** 18.17 or higher
- **npm** 9.0 or higher (or yarn/pnpm equivalent)
- **Git** for version control

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Malvin95/NLCC-FoodHub.git
cd NLCC-FoodHub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

#### Option A: Development with Mock Authentication (Recommended for quick start)

```env
# Auth Configuration
USE_MOCK_AUTH=true
NEXT_PUBLIC_USE_MOCK_AUTH=true

# NextAuth Configuration
NEXTAUTH_SECRET=dev-secret-not-for-production
NEXTAUTH_URL=http://localhost:3000
```

#### Option B: Production with AWS Cognito

```env
# AWS Cognito Configuration
COGNITO_ISSUER=https://cognito-idp.{region}.amazonaws.com/{region}_{poolId}
COGNITO_CLIENT_ID=your_client_id_here
COGNITO_CLIENT_SECRET=your_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Storybook:** http://localhost:6006

---

## Authentication Setup

### Understanding the Two Modes

#### 🔧 Development Mode (Mock Auth)
- **Use when:** Local development, testing, CI/CD pipelines
- **Setup:** Set `USE_MOCK_AUTH=true`
- **Benefits:** No AWS account needed, instant authentication
- **Credentials:** Use any email/password

#### 🔐 Production Mode (AWS Cognito)
- **Use when:** Staging, production, real user management
- **Setup:** Configure AWS Cognito credentials
- **Benefits:** Real user authentication, enterprise security
- **Requires:** AWS account with Cognito setup

### Setting Up AWS Cognito

1. **Create AWS Cognito User Pool:**
   - Go to [AWS Console](https://console.aws.amazon.com/) → Cognito
   - Create a new User Pool
   - Choose appropriate authentication settings

2. **Create App Client:**
   - In your User Pool, create an app client
   - Enable OAuth 2.0 / OpenID Connect
   - Set allowed callback URLs to `http://localhost:3000/api/auth/callback/cognito`

3. **Get Configuration:**
   - **Issuer URL:** `https://cognito-idp.{region}.amazonaws.com/{region}_{poolId}`
   - **Client ID:** From app client settings
   - **Client Secret:** From app client settings

4. **Add to `.env.local`:**
   ```env
   COGNITO_ISSUER=https://cognito-idp.us-east-1.amazonaws.com/us-east-1_xxxxx
   COGNITO_CLIENT_ID=your_client_id
   COGNITO_CLIENT_SECRET=your_client_secret
   NEXTAUTH_SECRET=your_generated_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

---

## Development Workflow

### IDE Setup

#### VS Code (Recommended)
1. Install extensions:
   - `ES7+ React/Redux/React-Native snippets`
   - `Prettier - Code formatter`
   - `ESLint`
   - `Tailwind CSS IntelliSense`
   - `TypeScript + React`

2. Create `.vscode/settings.json`:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": "explicit"
     }
   }
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth.test.ts
```

### Code Quality Checks

```bash
# Run ESLint
npm run lint

# Run ESLint with fix
npm run lint -- --fix

# Format with Prettier (if not auto-saving)
npx prettier --write .
```

### Storybook Development

```bash
# Start Storybook
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

Visit http://localhost:6006 to view your component library.

---

## Project Structure Quick Reference

```
src/
├── auth/                 # Authentication logic
│   ├── auth.ts          # Cognito config
│   ├── auth.mock.ts     # Mock auth for dev
│   ├── config.ts        # Feature flags
│   └── hooks/           # Auth hooks
├── app/
│   ├── api/             # API routes
│   ├── components/      # React components (Atomic Design)
│   │   ├── atoms/       # Basic elements
│   │   ├── molecules/   # Simple combinations
│   │   ├── organisms/   # Complex components
│   │   ├── templates/   # Layout templates
│   │   └── pages/       # Page components
│   ├── dashboard/       # Dashboard pages
│   │   ├── engagement/
│   │   ├── events/
│   │   ├── history/
│   │   ├── inventory/
│   │   └── volunteers/
│   └── shared/          # Shared utilities
└── lib/                 # Utility functions
```

---

## Building & Deployment

### Development Build

```bash
npm run build
npm start
```

### Production Build

Ensure all environment variables are set in your deployment platform.

```bash
npm run build
npm start
```

### Docker (Optional)

If deploying with Docker, create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t foodhub .
docker run -p 3000:3000 --env-file .env.local foodhub
```

---

## Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: Auth not working

**Check:**
1. Verify `.env.local` exists with correct variables
2. Confirm feature flags are set correctly
3. Check NextAuth callback URLs are correct
4. Inspect browser console for errors

### Issue: Storybook not starting

**Solution:**
```bash
npm run build-storybook
# or clear cache
rm -rf node_modules/.cache
npm run storybook
```

### Issue: Tests failing

**Solution:**
1. Clear Jest cache: `npm test -- --clearCache`
2. Check `.env.local` exists (even for tests)
3. Ensure dependencies installed: `npm install`

---

## Git Workflow

### Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Commit Changes

```bash
git add .
git commit -m "feat: describe your changes"
```

### Push to Remote

```bash
git push origin feature/your-feature-name
```

### Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Compare your branch with `main`
4. Add description and submit

---

## Best Practices

### Component Development
- ✅ Use Storybook for component-driven development
- ✅ Write tests for components with complex logic
- ✅ Follow Atomic Design principles
- ✅ Use TypeScript for type safety

### Authentication
- ✅ Never commit `.env.local` with secrets
- ✅ Use `NEXTAUTH_SECRET` for production
- ✅ Always validate tokens on the backend
- ✅ Set appropriate token expiration times

### Code Style
- ✅ Run `npm run lint -- --fix` before committing
- ✅ Enable auto-format in your IDE
- ✅ Keep components small and focused
- ✅ Use meaningful variable names

### Testing
- ✅ Write tests for critical paths
- ✅ Aim for >80% code coverage
- ✅ Test both happy and error paths
- ✅ Mock external dependencies

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Setup Guide](https://next-auth.js.org/getting-started/example)
- [AWS Cognito Setup](https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-cognito-user-pools.html)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Storybook Best Practices](https://storybook.js.org/docs/react/writing-stories/introduction)

---

## Support

For issues or questions:
1. Check existing GitHub issues
2. Review troubleshooting section above
3. Create a new issue with:
   - Environment details (Node version, OS)
   - Reproduction steps
   - Error messages/logs
   - Expected behavior
