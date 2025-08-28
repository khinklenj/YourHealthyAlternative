import { Request, Response, NextFunction } from 'express';
import { authService, type AuthenticatedUser } from '../auth';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
      session: any;
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const user = await authService.getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid session' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

export const requireProvider = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.userType !== 'provider') {
    return res.status(403).json({ error: 'Provider access required' });
  }
  next();
};

export const requireCustomer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.userType !== 'customer') {
    return res.status(403).json({ error: 'Customer access required' });
  }
  next();
};