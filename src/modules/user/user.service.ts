import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  updateUserProfile(userId: number, updateProfileInput: UpdateProfileInput) {
    return this.prisma.userProfile.upsert({
      create: {
        firstName: updateProfileInput.firstName,
        lastName: updateProfileInput.lastName,
        bio: updateProfileInput.bio,
        avatar: updateProfileInput.avatar,
        user: {
          connect: { id: userId },
        },
        createdAt: new Date().toISOString(),
      },
      update: {
        firstName: updateProfileInput.firstName,
        lastName: updateProfileInput.lastName,
        bio: updateProfileInput.bio,
        avatar: updateProfileInput.avatar,
        updatedAt: new Date().toISOString(),
      },
      where: { id: userId },
      include: { user: true },
    });
  }

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        email: createUserInput.email,
        username: createUserInput.username,
        password: createUserInput.password,
      },
    });
  }

  findByEmailOrUsername(data: string) {
    return this.prisma.user.findFirst({
      where: { OR: [{ username: data }, { email: data }] },
      include: { profile: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: { profile: true },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({ where: { id }, data: updateUserInput });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
