import bcrypt from 'bcryptjs';
import { db } from './db';
import { users, type User, type InsertUser } from '@shared/schema';
import { eq } from 'drizzle-orm';

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
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
      phone: user.phone || undefined,
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
      phone: user.phone || undefined,
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

  async updateUser(userId: string, updateData: any): Promise<any> {
    const updatedUser = await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser.length) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = updatedUser[0];
    return userWithoutPassword;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    // Get user with password
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return false;
    }

    // Hash new password and update
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await db
      .update(users)
      .set({
        password: hashedNewPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    return true;
  }
}

export const authService = new AuthService();