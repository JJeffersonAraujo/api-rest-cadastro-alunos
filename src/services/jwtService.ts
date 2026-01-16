import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";

interface JwtPayload {
  id: number;
  email: string;
}

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;

const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "1d") as StringValue;

const JWT_OPTIONS: SignOptions = {
  expiresIn: JWT_EXPIRES_IN,
};

export function gerarToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
}

export function validarToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
