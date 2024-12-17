import { User } from '@prisma/client';

export type UserRegisterDTO = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
