import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { JwtPayload } from './types/jwt.payload';
import { UserService } from '../user/user.service';
import { AuthPayload } from './types/auth.payload';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../shared/services/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async register(registerInput: RegisterInput): Promise<AuthPayload> {
    await this.checkEmailOrUsernameExists(
      registerInput.email,
      registerInput.username,
    );

    const hashPassword = await this.hashService.hash(registerInput.password);

    const user = await this.userService.create({
      email: registerInput.email,
      username: registerInput.username,
      password: hashPassword,
    });

    const token = await this.getToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return { access_token: token };
  }

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const user = await this.userService.findByEmailOrUsername(
      loginInput.emailOrUsername,
    );

    if (!user) throw new BadRequestException('User Not Found!');

    const passwordIsMatch = await this.hashService.compare(
      loginInput.password,
      user.password,
    );

    if (!passwordIsMatch)
      throw new BadRequestException('The crediotionals is not valid');

    const token = await this.getToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return { access_token: token };
  }

  private async getToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  private async checkEmailOrUsernameExists(
    email: string,
    username: string,
  ): Promise<void> {
    const emailExists = await this.userService.findByEmail(email);
    if (emailExists) throw new BadRequestException('Email already exists!');

    const usernameExists = await this.userService.findByUsername(username);
    if (usernameExists)
      throw new BadRequestException('Username already Exists!');
  }
}
