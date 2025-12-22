/**
 * FormFields: Email and password fields with optional helper link and OAuth actions.
 *
 * Usage: compose within `AuthPageTemplate` or a `Card`.
 * Accessibility:
 * - Labels are associated to inputs via `htmlFor`/`id`
 * - Inputs include `name` + `autoComplete` for better autofill
 * - Decorative SVG icons are hidden from assistive tech
 */

import { Button } from "../../atoms/button/button";
import { Input } from "../../atoms/ui/input";
import { Label } from "../../atoms/ui/label";

const googleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const appleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

export default function FormFields() {
  return (
    <div className="w-full">
      <form>
        <div className="flex flex-col gap-6 my-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="your-email@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <div className="flex items-center gap-2 my-4" aria-hidden="true">
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        <span className="px-4 bg-card text-gray-500 dark:text-gray-400">Or</span>
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full mb-4"
        aria-label="Login with Google"
      >
        <span className="mr-2">{googleIcon()}</span>
        Login with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        aria-label="Login with Apple"
      >
        <span className="mr-2">{appleIcon()}</span>
        Login with Apple
      </Button>
    </div>
  );
}
