import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
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
    });
  }

  findAll() {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
