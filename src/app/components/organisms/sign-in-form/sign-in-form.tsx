import FormFields from "../../molecules/form-fields/form-fields";
import { AuthPageTemplate } from "../../templates/auth-page-template/auth-page-template";

/**
 * SignInForm: Auth page organism composing the AuthPageTemplate and FormFields.
 *
 * - Provides page-level framing (title/description/footer)
 * - Embeds the shared form fields molecule for consistency
 */
export default function SignInForm() {
  return (
    <AuthPageTemplate
      title="Sign In"
      description="Access your FoodHub account"
      footer={<a className="text-sm underline">Create an account</a>}
    >
      <FormFields />
    </AuthPageTemplate>
  );
}
