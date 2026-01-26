import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../../atoms/ui/card/card";
import FormFields from "./form-fields";
import { expect, spyOn } from "storybook/test";

/**
 * Sign-in form component with email, password, and optional OAuth buttons.
 * Displays form fields within a Card wrapper.
 */
const meta: Meta<typeof FormFields> = {
  title: "Molecules/FormFields",
  component: FormFields,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSubmit: { description: "Form submit handler" },
    onGoogleLogin: { description: "OAuth Google click handler" },
    onAppleLogin: { description: "OAuth Apple click handler" },
  },
  args: {
    isLoading: false,
    onSubmit: () => console.log("form submitted"),
    onGoogleLogin: () => console.log("google login"),
    onAppleLogin: () => console.log("apple login"),
  },
  decorators: [
    (Story) => (
      <div
        className="w-full max-w-sm"
        onSubmitCapture={(e) => e.preventDefault()}
      >
        <Card>
          <Story />
        </Card>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof FormFields>;

/**
 * Desktop: Preview at a desktop viewport for layout inspection.
 */
export const Desktop: Story = {
  globals: {
    viewport: {
      value: "desktop",
      isRotated: false,
    },
  },
};

/**
 * Mobile: Preview at iPhone 12 viewport to validate responsiveness.
 */
export const Mobile: Story = {
  globals: {
    viewport: {
      value: "iphone12",
    },
  },
};

/**
 * Loading: Form in loading state with disabled inputs and submit button text changed.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * WithActions: Logs submit and OAuth button interactions in Storybook Actions.
 */

/**
 * InteractionTest: Validates all form interactions - submit and OAuth buttons.
 */
export const InteractionTest: Story = {
  args: {
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tests form submission and OAuth button interactions. Verifies all handlers are properly triggered.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const consoleSpy = spyOn(console, "log");

    const root = canvasElement as HTMLElement;
    const email = root.querySelector<HTMLInputElement>("#email");
    const password = root.querySelector<HTMLInputElement>("#password");
    const submit = root.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    );
    const google = root.querySelector<HTMLButtonElement>(
      'button[aria-label="Login with Google"]',
    );
    const apple = root.querySelector<HTMLButtonElement>(
      'button[aria-label="Login with Apple"]',
    );

    if (!email || !password || !submit || !google || !apple) {
      throw new Error("Form elements not found");
    }

    // Test form submission
    email.value = "test@example.com";
    email.dispatchEvent(new Event("input", { bubbles: true }));
    password.value = "password123";
    password.dispatchEvent(new Event("input", { bubbles: true }));
    submit.click();
    await expect(consoleSpy).toHaveBeenCalledWith("form submitted");

    // Test OAuth buttons
    google.click();
    await expect(consoleSpy).toHaveBeenCalledWith("google login");
    apple.click();
    await expect(consoleSpy).toHaveBeenCalledWith("apple login");

    consoleSpy.mockRestore();
  },
};
