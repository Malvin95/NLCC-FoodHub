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
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

/**
 * Mobile: Preview at iPhone 12 viewport to validate responsiveness.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
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
export const WithActions: Story = {
  args: {
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive variant: triggers Actions panel on form submit and OAuth button clicks.",
      },
    },
  },
  // Simulate typing and clicks, then verify handlers are called.
  play: async ({ canvasElement }) => {
    const consoleSpy = spyOn(console, "log");

    const root = canvasElement as HTMLElement;
    const email = root.querySelector<HTMLInputElement>("#email");
    const password = root.querySelector<HTMLInputElement>("#password");
    const submit = root.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );
    const google = root.querySelector<HTMLButtonElement>(
      'button[aria-label="Login with Google"]'
    );
    const apple = root.querySelector<HTMLButtonElement>(
      'button[aria-label="Login with Apple"]'
    );

    if (!email || !password || !submit || !google || !apple) {
      throw new Error("Form elements not found for interaction test");
    }

    email.focus();
    email.value = "tester@example.com";
    email.dispatchEvent(new Event("input", { bubbles: true }));

    password.focus();
    password.value = "supersecret";
    password.dispatchEvent(new Event("input", { bubbles: true }));

    submit.click();
    await expect(consoleSpy).toHaveBeenCalledWith("form submitted");

    google.click();
    await expect(consoleSpy).toHaveBeenCalledWith("google login");

    apple.click();
    await expect(consoleSpy).toHaveBeenCalledWith("apple login");

    consoleSpy.mockRestore();
  },
};

/**
 * SubmitOnly: Focused interaction that types credentials and submits the form.
 */
export const SubmitOnly: Story = {
  args: {
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const consoleSpy = spyOn(console, "log");

    const root = canvasElement as HTMLElement;
    const email = root.querySelector<HTMLInputElement>("#email");
    const password = root.querySelector<HTMLInputElement>("#password");
    const submit = root.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );
    if (!email || !password || !submit)
      throw new Error("SubmitOnly: elements missing");
    
    email.value = "foo@bar.com";
    email.dispatchEvent(new Event("input", { bubbles: true }));
    password.value = "password123";
    password.dispatchEvent(new Event("input", { bubbles: true }));
    
    submit.click();
    await expect(consoleSpy).toHaveBeenCalledWith("form submitted");
    
    consoleSpy.mockRestore();
  },
};

/**
 * OAuthClicks: Validates Google and Apple button click interactions.
 */
export const OAuthClicks: Story = {
  args: {
    isLoading: false,
  },
  play: async ({ canvasElement }) => {
    const consoleSpy = spyOn(console, "log");

    const root = canvasElement as HTMLElement;
    const google = root.querySelector<HTMLButtonElement>(
      'button[aria-label="Login with Google"]'
    );
    const apple = root.querySelector<HTMLButtonElement>(
      'button[aria-label="Login with Apple"]'
    );
    if (!google || !apple) throw new Error("OAuthClicks: elements missing");
    
    google.click();
    await expect(consoleSpy).toHaveBeenCalledWith("google login");
    
    apple.click();
    await expect(consoleSpy).toHaveBeenCalledWith("apple login");
    
    consoleSpy.mockRestore();
  },
};
