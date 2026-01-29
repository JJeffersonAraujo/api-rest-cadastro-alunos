import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

interface AuthTokenPayload {
  id: number;
  email: string;
}

const signOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
};

export class JwtUtils {
  static sign(payload: AuthTokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, signOptions);
  }

  static verify(token: string): AuthTokenPayload {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (
      typeof decoded !== "object" ||
      typeof decoded.id !== "number" ||
      typeof decoded.email !== "string"
    ) {
      throw new Error("Token inválido");
    }

    return {
      id: decoded.id,
      email: decoded.email,
    };
  }
}
