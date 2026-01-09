# NLCC Food Hub - Component Development Guide

## Overview

This guide explains how to develop, test, and document components in the NLCC Food Hub project using **Storybook**, **Atomic Design**, and **TypeScript**.

---

## Atomic Design System

The project follows **Atomic Design** principles, organizing components into five hierarchical levels:

### 1. **Atoms** - Basic UI Elements
The smallest, most fundamental building blocks.

**Examples:**
- Button
- Input
- Label
- Icon
- Badge
- Spinner

**Location:** `src/app/components/atoms/`

**Characteristics:**
- Single responsibility
- Can't be broken down further
- Reusable across the application
- Minimal logic

**Example:**

```typescript
// src/app/components/atoms/Button.tsx
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = "Button";
```

**Storybook Story:**

```typescript
// src/app/components/atoms/Button.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Click me" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large Button" },
};
```

---

### 2. **Molecules** - Simple Combinations
Components composed of atoms working together.

**Examples:**
- FormField (Label + Input)
- Card
- Calendar
- FilterBar
- SearchBox

**Location:** `src/app/components/molecules/`

**Characteristics:**
- Composed of atoms
- Simple, focused functionality
- Reusable patterns
- Light business logic

**Example:**

```typescript
// src/app/components/molecules/FormField.tsx
import React from "react";
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  helpText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  error,
  required,
  helpText,
  ...props
}) => (
  <div className="space-y-1">
    <Label htmlFor={name} required={required}>
      {label}
    </Label>
    <Input id={name} name={name} type={type} {...props} />
    {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

FormField.displayName = "FormField";
```

**Storybook Story:**

```typescript
// src/app/components/molecules/FormField.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Email", name: "email", type: "email" },
};

export const WithError: Story = {
  args: {
    label: "Email",
    name: "email",
    error: "Invalid email address",
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Password",
    name: "password",
    type: "password",
    helpText: "Must be at least 8 characters",
  },
};
```

---

### 3. **Organisms** - Complex Components
Complex components with significant logic and interactions.

**Examples:**
- Navigation
- Forms
- Dashboard sections
- Modals
- Tables

**Location:** `src/app/components/organisms/`

**Characteristics:**
- Composed of molecules and atoms
- Complex logic and state
- Multiple responsibilities
- Page-level components

**Example:**

```typescript
// src/app/components/organisms/LoginForm.tsx
"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        onSuccess?.();
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <FormField
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};
```

---

### 4. **Templates** - Page Layouts
Layout components that define page structure.

**Examples:**
- DashboardLayout
- AuthLayout
- SidebarLayout
- ContentLayout

**Location:** `src/app/components/templates/`

**Characteristics:**
- Define page layout structure
- Accept children components
- No heavy logic
- Reused across multiple pages

**Example:**

```typescript
// src/app/components/templates/DashboardLayout.tsx
import React from "react";
import { Sidebar } from "../organisms/Sidebar";
import { Header } from "../organisms/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  </div>
);
```

---

### 5. **Pages** - Full Page Components
Complete page implementations combining templates and organisms.

**Location:** `src/app/` and `src/app/dashboard/`

**Characteristics:**
- Full page implementations
- Server or client components
- Data fetching
- Route-specific logic

**Example:**

```typescript
// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/auth";
import { DashboardLayout } from "@/app/components/templates/DashboardLayout";
import { EngagementCard } from "@/app/components/molecules/EngagementCard";

export default async function DashboardPage() {
  const session = await getServerSession(getAuthOptions());

  if (!session) {
    return <div>Access denied</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1>Welcome back, {session.user?.email}</h1>
        <div className="grid grid-cols-3 gap-4">
          <EngagementCard title="Active Users" value="1,234" />
          <EngagementCard title="Events" value="45" />
          <EngagementCard title="Inventory Items" value="892" />
        </div>
      </div>
    </DashboardLayout>
  );
}
```

---

## Creating New Components

### Step 1: Determine Component Level

Ask yourself:
- Can this be broken down further? → **Atom**
- Combination of atoms? → **Molecule**
- Complex with logic? → **Organism**
- Page structure? → **Template**
- Full page? → **Page**

### Step 2: Create Component File

```bash
# For atoms
touch src/app/components/atoms/MyComponent.tsx

# For molecules
touch src/app/components/molecules/MyComponent.tsx
```

### Step 3: Write Component

Use TypeScript and follow conventions:

```typescript
import React from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps {
  // Props definition
  title: string;
  variant?: "default" | "secondary";
  onClick?: () => void;
  children?: React.ReactNode;
}

/**
 * MyComponent description
 * 
 * @param title - The component title
 * @param variant - Visual variant
 * @param onClick - Click handler
 * @example
 * ```tsx
 * <MyComponent title="Hello" onClick={() => console.log('clicked')} />
 * ```
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  variant = "default",
  onClick,
  children,
}) => {
  return (
    <div className="your-classes" onClick={onClick}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

MyComponent.displayName = "MyComponent";
```

### Step 4: Create Storybook Story

Create a `.stories.ts` or `.stories.tsx` file:

```typescript
// src/app/components/atoms/MyComponent.stories.ts
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta = {
  title: "Atoms/MyComponent", // or "Molecules/", "Organisms/"
  component: MyComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"], // Auto-generate documentation
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "secondary"],
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary story
export const Default: Story = {
  args: {
    title: "Hello World",
  },
};

// Variant stories
export const Secondary: Story = {
  args: {
    title: "Secondary Variant",
    variant: "secondary",
  },
};

// With content
export const WithChildren: Story = {
  args: {
    title: "With Content",
    children: <p>This is child content</p>,
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    title: "Click me",
  },
  render: (args) => {
    const [clicked, setClicked] = React.useState(false);
    return (
      <div>
        <MyComponent {...args} onClick={() => setClicked(!clicked)} />
        {clicked && <p>Clicked!</p>}
      </div>
    );
  },
};
```

### Step 5: Write Tests

Create a test file:

```typescript
// src/app/components/atoms/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders with title", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = jest.fn();
    render(<MyComponent title="Test" onClick={handleClick} />);

    await userEvent.click(screen.getByText("Test"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders children", () => {
    render(
      <MyComponent title="Test">
        <span>Child content</span>
      </MyComponent>
    );

    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("applies secondary variant styles", () => {
    const { container } = render(
      <MyComponent title="Test" variant="secondary" />
    );
    // Test variant-specific styles
  });
});
```

---

## Styling Components

### Using TailwindCSS

```typescript
export const MyComponent: React.FC<MyComponentProps> = ({ variant }) => {
  const baseClasses = "rounded-lg p-4 font-medium transition-colors";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return <div className={`${baseClasses} ${variantClasses}`}></div>;
};
```

### Using CVA (Class Variance Authority)

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      primary: "primary-classes",
      secondary: "secondary-classes",
    },
    size: {
      sm: "small-classes",
      lg: "large-classes",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

interface MyComponentProps extends VariantProps<typeof componentVariants> {}

export const MyComponent: React.FC<MyComponentProps> = ({
  variant,
  size,
}) => {
  return <div className={componentVariants({ variant, size })}></div>;
};
```

### Using cn() Utility

```typescript
import { cn } from "@/lib/utils";

export const MyComponent: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div
      className={cn("base-classes", "other-classes", className)}
    ></div>
  );
};
```

---

## Storybook Workflow

### Start Storybook

```bash
npm run storybook
```

Opens at http://localhost:6006

### Writing Stories

**Basic Story:**
```typescript
export const Default: Story = {
  args: { title: "My Title" },
};
```

**Story with Custom Render:**
```typescript
export const Custom: Story = {
  render: (args) => <MyComponent {...args} />,
};
```

**Story with Interactions:**
```typescript
import { expect, fn, userEvent, within } from "@storybook/test";

export const Interactive: Story = {
  args: { onClick: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
  },
};
```

### Storybook Features

- **Args:** Configure props
- **Controls:** Interactive prop controls
- **Docs:** Auto-generated documentation
- **A11y:** Accessibility testing
- **Viewport:** Test responsive design
- **Themes:** Test different themes

---

## Best Practices

### Naming Conventions

```typescript
// ✅ DO - Clear, descriptive names
export const EngagementCard = () => {};
export const UserProfileForm = () => {};
export const NotificationBadge = () => {};

// ❌ DON'T - Vague names
export const Card = () => {};
export const Form = () => {};
export const Badge = () => {};
```

### Props Definition

```typescript
// ✅ DO - Well-documented props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: "primary" | "secondary";
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Whether button is loading */
  isLoading?: boolean;
}

// ❌ DON'T - Unclear prop types
interface ButtonProps {
  variant?: string;
  size?: any;
  [key: string]: unknown;
}
```

### Component Composition

```typescript
// ✅ DO - Composable structure
export const Card = ({ children }) => <div className="card">{children}</div>;

export const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

// Usage
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### Forwarding Refs

```typescript
// ✅ DO - For interactive components
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input {...props} ref={ref} />
);

Input.displayName = "Input";
```

### Stories Organization

```typescript
// ✅ DO - Group related stories
export const Default: Story = { /* ... */ };
export const Small: Story = { /* ... */ };
export const Large: Story = { /* ... */ };
export const Disabled: Story = { /* ... */ };
export const Loading: Story = { /* ... */ };
```

---

## Testing Components

### Unit Tests

```typescript
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  test("renders correctly", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("handles user interactions", async () => {
    const { user } = render(<MyComponent title="Test" />);
    await user.click(screen.getByRole("button"));
  });
});
```

### Accessibility Tests

```typescript
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

test("should not have accessibility violations", async () => {
  const { container } = render(<MyComponent title="Test" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Visual Tests (Storybook)

- Use Chromatic for visual regression testing
- Run: `npm run chromatic`
- Compares snapshots of your stories

---

## Common Patterns

### Conditional Rendering

```typescript
interface StatusBadgeProps {
  status: "active" | "inactive" | "pending";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    active: { bg: "bg-green-100", text: "text-green-800" },
    inactive: { bg: "bg-gray-100", text: "text-gray-800" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
  };

  const { bg, text } = config[status];
  return <span className={`${bg} ${text} px-2 py-1 rounded`}>{status}</span>;
};
```

### Form Components

```typescript
interface FormProps {
  onSubmit: (data: FormData) => void;
}

export const MyForm: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
};
```

### Loading States

```typescript
interface DataComponentProps {
  isLoading?: boolean;
  data?: DataType[];
  error?: Error;
}

export const DataComponent: React.FC<DataComponentProps> = ({
  isLoading,
  data,
  error,
}) => {
  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data?.length) return <EmptyState />;
  return <DataList items={data} />;
};
```

---

## Resources

- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Atomic Design](https://atomicdesign.bradfrost.com/)
- [React Best Practices](https://react.dev/learn)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro)
