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
import { AppleIcon } from "../../atoms/icons/apple-icon";
import { GoogleIcon } from "../../atoms/icons/google-icon";
import { Input } from "../../atoms/ui/input";
import { Label } from "../../atoms/ui/label";

interface FormFieldsProps {
  isLoading?: boolean;
  onSubmit?: () => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

export default function FormFields({
  isLoading = false,
  onGoogleLogin,
  onAppleLogin,
  onSubmit,
}: FormFieldsProps) {
  return (
    <div className="w-full">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6 my-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="your-email@example.com"
              autoComplete="email"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                tabIndex={isLoading ? -1 : 0}
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              disabled={isLoading}
              required
              minLength={8}
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Login"}
        </Button>
      </form>
      <div className="flex items-center gap-2 my-4">
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        <span className="px-4 bg-card text-gray-500 dark:text-gray-400">
          Or
        </span>
        <hr className="flex-1 border-gray-300 dark:border-gray-600" />
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full mb-4"
        aria-label="Login with Google"
        disabled={isLoading}
        onClick={onGoogleLogin}
      >
        <span className="mr-2">
          <GoogleIcon />
        </span>
        Login with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        aria-label="Login with Apple"
        disabled={isLoading}
        onClick={onAppleLogin}
      >
        <span className="mr-2">
          <AppleIcon />
        </span>
        Login with Apple
      </Button>
    </div>
  );
}
