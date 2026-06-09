import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth-service.service';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Token de autorización no provisto.',
      error: 'Debe incluir la cabecera Authorization con el formato: Bearer <token>'
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      success: false,
      message: 'Formato de token inválido.',
      error: 'El token debe tener el formato: Bearer <token>'
    });
  }

  const token = parts[1];

  try {
    const authService = new AuthService(process.env.JWT_SECRET || 'web_app_ats_management_api');
    const decoded = authService.verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado.',
      error: error.message
    });
  }
};
