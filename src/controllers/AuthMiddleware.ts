import { ExpressMiddlewareInterface } from "routing-controllers";
import { validarToken } from "../services/jwtService";

export class AuthMiddleware implements ExpressMiddlewareInterface {
  use(req: any, res: any, next: (err?: any) => any) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não informado" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Formato do token inválido" });
    }

    try {
      req.user = validarToken(token);
      next();
    } catch {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  }
}
