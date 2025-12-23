import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../atoms/ui/card/card";

/**
 * Auth page layout template.
 *
 * Provides a centered card with optional header (title/description),
 * optional logo area, and optional footer. Place your form/content in `children`.
 */
export interface AuthPageTemplateProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  logo?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthPageTemplate({
  title,
  description,
  logo,
  children,
  footer,
}: AuthPageTemplateProps) {
  return (
    <main
      className="flex items-center justify-center min-h-screen py-8"
      aria-labelledby={title ? "auth-title" : undefined}
    >
      <Card className="w-full max-w-md">
        {(logo || title || description) && (
          <CardHeader>
            {logo && <div className="mb-2 flex justify-center">{logo}</div>}
            {title && <CardTitle id="auth-title">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </main>
  );
}
