import { CognitoIdentityProviderClient, GlobalSignOutCommand } from "@aws-sdk/client-cognito-identity-provider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { accessToken } = req.body;

  try {
    const client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION,
    });

    const command = new GlobalSignOutCommand({
      AccessToken: accessToken
    });

    await client.send(command);
    
    res.status(200).json({ message: "Successfully signed out from Cognito" });
  } catch (error) {
    console.error("Cognito logout error:", error);
    res.status(500).json({ message: "Failed to sign out from Cognito" });
  }
}
