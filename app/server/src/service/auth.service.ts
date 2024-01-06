import { OAuth2Client, TokenPayload } from "google-auth-library";
import { envConfig } from "../config/env";
import { userRepository } from "../repository/user.repository";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { z } from "zod";

class AuthService {
  oauthClient: OAuth2Client;

  tokenSchema = z.object({
    name: z.string(),
    email: z.string(),
    picture: z.string(),
    id: z.coerce.string(),
  });

  constructor() {
    this.oauthClient = new OAuth2Client({
      clientId: envConfig.googleClientId,
      clientSecret: envConfig.googleClientSecret,
      redirectUri: "http://localhost:4000"
    });
  }

  async signJwtFromGoogleAuthCode(code: string): Promise<string> {
    console.log(code)
    await this.oauthClient.getToken(code, (d, ddd)=> {
      console.log("dddd: ", d)
    });
    return this.signJwtFromGoogleToken("");
  }

  async signJwtFromGoogleToken(token: string): Promise<string> {
    const userPayload = await this.verifyGoogleToken(token);

    const user = await userRepository.createIfNotExist({
      email: userPayload.email,
      picture: userPayload.picture,
      name: userPayload.name,
    });

    const userInfo = this.tokenSchema.parse({
      name: user.name,
      email: user.email,
      picture: user.picture,
      id: user.id,
    });

    var token = jwt.sign(userInfo, envConfig.authSecret, {
      algorithm: "HS512",
    });
    return token;
  }

  async getUserFromSession(sessionToken: string): Promise<User> {
    let user;
    jwt.verify(sessionToken, envConfig.authSecret, (err, decoded) => {
      if (err) throw err;
      console.log(decoded);
      user = this.tokenSchema.parse(decoded) as User;
    });

    return user;
  }

  private async verifyGoogleToken(token: string): Promise<TokenPayload> {
    const oauthResponse = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: envConfig.googleClientId,
    });
    return oauthResponse.getPayload();
  }
}

export const authService = new AuthService();
