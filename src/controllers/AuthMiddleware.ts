import { ExpressMiddlewareInterface } from "routing-controllers";
import { validarToken } from "./../services/jwtService";

export class AuthMiddleware implements ExpressMiddlewareInterface {
  use(req: any, res: any, next: (err?: any) => any) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não informado" });
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = validarToken(token);
      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: "Token inválido" });
    }
  }
}
