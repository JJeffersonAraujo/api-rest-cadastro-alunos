import jwt from "jsonwebtoken";

export interface AuthTokenPayload {
  id: number;
  email: string;
}

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido no .env");
}

function isAuthTokenPayload(payload: any): payload is AuthTokenPayload {
  return (
    payload &&
    typeof payload === "object" &&
    typeof payload.id === "number" &&
    typeof payload.email === "string"
  );
}

export function gerarToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function validarToken(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (!isAuthTokenPayload(decoded)) {
    throw new Error("Token inválido");
  }

  return decoded;
}
