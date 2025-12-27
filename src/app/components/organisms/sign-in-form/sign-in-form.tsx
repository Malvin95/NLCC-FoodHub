import FormFields from "../../molecules/form-fields/form-fields";
import { AuthPageTemplate } from "../../templates/auth-page-template/auth-page-template";

interface SignInFormProps {
  onSubmit?: () => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

/**
 * SignInForm: Auth page organism composing the AuthPageTemplate and FormFields.
 *
 * - Provides page-level framing (title/description/footer)
 * - Embeds the shared form fields molecule for consistency
 */
export default function SignInForm({
  onSubmit,
  onGoogleLogin,
  onAppleLogin,
}: SignInFormProps) {
  return (
    <AuthPageTemplate
      title="Sign In"
      description="Access your FoodHub account"
      footer={
        <a href="/sign-in" className="text-sm underline">
          Create an account
        </a>
      }
    >
      <FormFields
        onSubmit={onSubmit}
        onGoogleLogin={onGoogleLogin}
        onAppleLogin={onAppleLogin}
      />
    </AuthPageTemplate>
  );
}
