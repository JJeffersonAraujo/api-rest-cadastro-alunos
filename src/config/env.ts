import "dotenv/config";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variável de ambiente ${name} não definida`);
  }
  return value;
}

export const env = {
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
};
