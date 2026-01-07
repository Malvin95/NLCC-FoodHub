import { CognitoIdentityProviderClient, GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token is required" },
        { status: 400 }
      );
    }

    const region = process.env.COGNITO_REGION;
    if (!region) {
      return NextResponse.json(
        { message: "COGNITO_REGION environment variable is not configured" },
        { status: 500 }
      );
    }

    const client = new CognitoIdentityProviderClient({
      region,
    });

    const command = new GlobalSignOutCommand({
      AccessToken: accessToken,
    });

    await client.send(command);

    return NextResponse.json({ message: "Successfully signed out from Cognito" });
  } catch (error) {
    console.error("Cognito GlobalSignOut error:", error);
    return NextResponse.json(
      { message: "Failed to sign out from Cognito" }, // TODO: improve error handling for server errors
      { status: 500 }
    );
  }
}
