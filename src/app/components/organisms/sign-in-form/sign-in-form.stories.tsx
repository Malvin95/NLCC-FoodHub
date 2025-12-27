/**
 * Stories for the SignInForm organism composed of AuthPageTemplate + FormFields.
 *
 * Tests the full sign-in page including:
 * - Form field interactions (email, password)
 * - OAuth button flows
 * - Page layout and composition
 * - Mobile responsiveness
 */
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn } from "storybook/test";
import SignInForm from "./sign-in-form";

const meta: Meta<typeof SignInForm> = {
  title: "Organisms/SignInForm",
  component: SignInForm,
  args: {
    onSubmit: fn().mockName("onSubmit"),
    onGoogleLogin: fn().mockName("onGoogleLogin"),
    onAppleLogin: fn().mockName("onAppleLogin"),
  },
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof SignInForm>;

/**
 * Default: Full sign-in page on desktop viewport.
 */
export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

/**
 * Mobile: Sign-in page on iPhone 12 viewport.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
  },
};

/**
 * FullFormFlow: Complete sign-in interaction with form submission.
 * Tests entering credentials, submitting, and verifying the handler is called.
 */
export const FullFormFlow: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "Demonstrates a complete user flow: entering credentials, submitting, and verifying handler execution.",
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const form = canvasElement.querySelector("form")!;

    // Prevent actual submission that might navigate/reload
    form.addEventListener("submit", (e) => e.preventDefault());

    const root = canvasElement as HTMLElement;
    const email = root.querySelector<HTMLInputElement>("#email");
    const password = root.querySelector<HTMLInputElement>("#password");
    const submit = root.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );

    // Assert form elements exist; fail loudly if not
    await expect(email).toBeTruthy();
    await expect(password).toBeTruthy();
    await expect(submit).toBeTruthy();

    // Simulate user input directly (no if gate)
    email!.value = "user@foodhub.com";
    email!.dispatchEvent(new Event("input", { bubbles: true }));

    password!.value = "SecurePassword123!";
    password!.dispatchEvent(new Event("input", { bubbles: true }));

    // Trigger submission and verify
    submit!.click();
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};

/**
 * OAuthFlow: Tests OAuth authentication buttons (Google and Apple).
 * Verifies both OAuth handlers are triggered independently.
 */
export const OAuthFlow: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "Tests OAuth provider buttons: Google and Apple login handlers are properly called.",
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const root = canvasElement as HTMLElement;
    const google = root.querySelector<HTMLButtonElement>(
      'button[aria-label="Login with Google"]'
    );
    const apple = root.querySelector<HTMLButtonElement>(
      'button[aria-label="Login with Apple"]'
    );

    // Assert OAuth buttons exist; fail loudly if not
    await expect(google).toBeTruthy();
    await expect(apple).toBeTruthy();

    // Click Google OAuth and verify
    google!.click();
    await expect(args.onGoogleLogin).toHaveBeenCalled();

    // Click Apple OAuth and verify
    apple!.click();
    await expect(args.onAppleLogin).toHaveBeenCalled();
  },
};

/**
 * MobileFormFlow: Tests the sign-in flow on mobile (iPhone 12).
 * Ensures responsiveness and all interactions work on smaller screens.
 */
export const MobileFormFlow: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
    docs: {
      description: {
        story:
          "Mobile-specific test: verifies form interactions and button clicks work correctly at mobile viewport.",
      },
    },
  },
  play: async ({ args, canvasElement }) => {
    const form = canvasElement.querySelector("form")!;

    // Prevent actual submission that might navigate/reload
    form.addEventListener("submit", (e) => e.preventDefault());

    const root = canvasElement as HTMLElement;
    const email = root.querySelector<HTMLInputElement>("#email");
    const password = root.querySelector<HTMLInputElement>("#password");
    const submit = root.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );

    // Assert form elements exist; fail loudly if not
    await expect(email).toBeTruthy();
    await expect(password).toBeTruthy();
    await expect(submit).toBeTruthy();

    // Simulate user input directly (no if gate)
    email!.value = "mobile@test.com";
    email!.dispatchEvent(new Event("input", { bubbles: true }));

    password!.value = "MobileTest123!";
    password!.dispatchEvent(new Event("input", { bubbles: true }));

    // Trigger submission and verify
    submit!.click();
    await expect(args.onSubmit).toHaveBeenCalled();
  },
};

/**
 * PageLayout: Verifies the complete page structure.
 * Checks AuthPageTemplate composition: title, description, form, and footer.
 */
export const PageLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "Validates the page structure: title, description, form fields, and footer link are all rendered correctly.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;

    // Check for page title
    const title = root.textContent?.includes("Sign In");
    await expect(title).toBeTruthy();

    // Check for page description
    const description = root.textContent?.includes(
      "Access your FoodHub account"
    );
    await expect(description).toBeTruthy();

    // Check form fields exist
    const email = root.querySelector("#email");
    const password = root.querySelector("#password");
    await expect(email).toBeTruthy();
    await expect(password).toBeTruthy();

    // Check for footer link
    const footerLink = root.querySelector("a");
    await expect(footerLink).toBeTruthy();
  },
};
