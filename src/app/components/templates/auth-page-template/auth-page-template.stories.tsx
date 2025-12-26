import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
import { AuthPageTemplate } from "./auth-page-template";
import FormFields from "../../molecules/form-fields/form-fields";
import Image from "next/image";

/**
 * Stories for the AuthPageTemplate, demonstrating header, logo, content,
 * and footer composition using atomic components.
 *
 * Tests the template's:
 * - Centered layout and full-height viewport
 * - Optional header (title, description, logo)
 * - Card composition and spacing
 * - Footer rendering
 * - Responsive behavior on mobile/desktop
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
 * Desktop viewport for standard layout inspection.
 */
export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
  render: () => (
    <AuthPageTemplate
      title="Sign In"
      description="Access your FoodHub account"
      logo={<Image src="/vercel.svg" alt="FoodHub" width={32} height={32} />}
      footer={
        <a href="#" className="text-sm underline">
          Create an account
        </a>
      }
    >
      <FormFields />
    </AuthPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;

    // Verify main container exists and is centered
    const main = root.querySelector("main");
    await expect(main).toBeTruthy();
    await expect(main!.classList.contains("flex")).toBeTruthy();
    await expect(main!.classList.contains("items-center")).toBeTruthy();
    await expect(main!.classList.contains("justify-center")).toBeTruthy();

    // Verify Card component is rendered
    const card = root.querySelector('[class*="rounded"]');
    await expect(card).toBeTruthy();

    // Verify header elements exist
    const title = root.querySelector("#auth-title");
    await expect(title).toBeTruthy();
    await expect(title!.textContent).toBeTruthy();

    // Verify footer link exists
    const footer = root.querySelector("a");
    await expect(footer).toBeTruthy();
  },
};

/**
 * DesktopFull: Complete template on desktop with all optional elements.
 */
export const DesktopFull: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
  render: () => (
    <AuthPageTemplate
      title="Sign In"
      description="Access your FoodHub account"
      logo={<Image src="/vercel.svg" alt="FoodHub" width={32} height={32} />}
      footer={
        <a href="#" className="text-sm underline">
          Create an account
        </a>
      }
    >
      <FormFields />
    </AuthPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;

    // Verify logo is rendered
    const logo = root.querySelector("img");
    await expect(logo).toBeTruthy();
    await expect(logo!.getAttribute("alt")).toBeTruthy();

    // Verify title and description
    const title = root.querySelector("#auth-title");
    const description = root.textContent?.includes(
      "Access your FoodHub account"
    );
    await expect(title).toBeTruthy();
    await expect(description).toBeTruthy();

    // Verify footer
    const footer = root.querySelector("a");
    await expect(footer).toBeTruthy();
  },
};

/**
 * Mobile: Template on iPhone 12 viewport to test responsive layout.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "iphone12",
    },
  },
  render: () => (
    <AuthPageTemplate
      title="Sign In"
      description="Access your FoodHub account"
      footer={
        <a href="#" className="text-sm underline">
          Create an account
        </a>
      }
    >
      <FormFields />
    </AuthPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;

    // Verify layout is still centered on mobile
    const main = root.querySelector("main");
    await expect(main).toBeTruthy();
    await expect(main!.classList.contains("flex")).toBeTruthy();
    await expect(main!.classList.contains("items-center")).toBeTruthy();

    // Verify card respects max-width constraint
    const card = root.querySelector('[class*="max-w"]');
    await expect(card).toBeTruthy();

    // Verify form is rendered
    const form = root.querySelector("form");
    await expect(form).toBeTruthy();
  },
};

/**
 * WithoutHeader: Template without title/description/logo (minimal header).
 */
export const WithoutHeader: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
  render: () => (
    <AuthPageTemplate footer={<a href="#">Back to home</a>}>
      <FormFields />
    </AuthPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;

    // Verify no title is rendered
    const title = root.dataset["auth-title"];
    await expect(title).not.toBeTruthy(); // exists but is empty

    // Verify card content still renders
    const form = root.querySelector("form");
    await expect(form).toBeTruthy();

    // Verify footer exists
    const footer = root.querySelector("a");
    await expect(footer).toBeTruthy();
  },
};

/**
 * Minimal: Template without any optional elements; bare form only.

/**
 * Minimal: Template without header/footer; shows bare content area with FormFields.
 */
export const Minimal: Story = {
  render: () => (
    <AuthPageTemplate>
      <FormFields />
    </AuthPageTemplate>
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;

    // Verify layout container exists
    const main = root.querySelector("main");
    await expect(main).toBeTruthy();

    // Verify form is rendered
    const form = root.querySelector("form");
    await expect(form).toBeTruthy();

    // Verify form fields exist even without header
    const email = root.querySelector("#email");
    await expect(email).toBeTruthy();
  },
};
