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

    const client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION,
    });

    const command = new GlobalSignOutCommand({
      AccessToken: accessToken,
    });

    await client.send(command);

    return NextResponse.json({ message: "Successfully signed out from Cognito" });
  } catch (error) {
    console.error("Cognito GlobalSignOut error:", error);
    return NextResponse.json(
      { message: "Failed to sign out from Cognito", error: String(error) },
      { status: 500 }
    );
  }
}
