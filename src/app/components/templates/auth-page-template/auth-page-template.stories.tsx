import type { Meta, StoryObj } from "@storybook/react";
import { AuthPageTemplate } from "./auth-page-template";
import FormFields from "../../molecules/form-fields/form-fields";
import Image from "next/image";

/**
 * Stories for the AuthPageTemplate, demonstrating header, logo, content,
 * and footer composition using atomic components.
 */
const meta: Meta<typeof AuthPageTemplate> = {
  title: "Templates/AuthPageTemplate",
  component: AuthPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof AuthPageTemplate>;

/**
 * Default: Template with header (logo, title, description) and footer composing FormFields.
 */
export const Default: Story = {
  render: () => (
    <AuthPageTemplate
      title="Sign In"
      description="Access your FoodHub account"
      logo={<Image src="/vercel.svg" alt="FoodHub" width={32} height={32} />}
      footer={<a className="text-sm underline">Create an account</a>}
    >
      <FormFields />
    </AuthPageTemplate>
  ),
};

/**
 * Minimal: Template without header/footer; shows bare content area with FormFields.
 */
export const Minimal: Story = {
  render: () => (
    <AuthPageTemplate>
      <FormFields />
    </AuthPageTemplate>
  ),
};
