import session from 'express-session';
import connectPg from 'connect-pg-simple';

const PgSession = connectPg(session);

export function setupSession() {
  return session({
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      tableName: 'sessions',
      createTableIfMissing: false,
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  });
}

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}