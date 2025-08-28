import bcrypt from 'bcryptjs';
import { db } from './db';
import { users, type User, type InsertUser } from '@shared/schema';
import { eq } from 'drizzle-orm';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'customer' | 'provider';
  providerId?: string;
}

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password);
    
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        password: hashedPassword,
      })
      .returning();
    
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<AuthenticatedUser | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    if (!user) {
      return null;
    }

    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType as 'customer' | 'provider',
      providerId: user.providerId || undefined,
    };
  }

  async getUserById(id: string): Promise<AuthenticatedUser | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType as 'customer' | 'provider',
      providerId: user.providerId || undefined,
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    return user || null;
  }
}

export const authService = new AuthService();