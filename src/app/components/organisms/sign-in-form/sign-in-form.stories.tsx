/**
 * Stories for the SignInForm organism composed of AuthPageTemplate + FormFields.
 */
import type { Meta, StoryObj } from "@storybook/react";
import SignInForm from "./sign-in-form";

const meta: Meta<typeof SignInForm> = {
  title: "Organisms/SignInForm",
  component: SignInForm,
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
