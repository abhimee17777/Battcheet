import 'next-auth';
import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    password?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
} 