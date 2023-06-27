import { Role } from '@prisma/client';

export type JwtPayload = {
  id: number;
  username: string;
  role: Role;
};
