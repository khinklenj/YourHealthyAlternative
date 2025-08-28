import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authService } from '../auth';
import { requireAuth } from '../middleware/auth';

interface AuthRequest extends Request {
  session: any;
}

const router = Router();

// Login schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Register schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  userType: z.enum(['customer', 'provider']),
  phone: z.string().optional(),
});

// Register endpoint
router.post('/register', async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await authService.getUserByEmail(validatedData.email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create user
    const user = await authService.createUser(validatedData);
    
    // Create session
    req.session.userId = user.id;
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    res.status(201).json({ 
      message: 'User created successfully', 
      user: userWithoutPassword 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await authService.authenticateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create session
    req.session.userId = user.id;
    
    res.json({ message: 'Login successful', user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
router.post('/logout', (req: AuthRequest, res: Response) => {
  req.session.destroy((err: any) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Could not log out' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout successful' });
  });
});

// Get current user
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;