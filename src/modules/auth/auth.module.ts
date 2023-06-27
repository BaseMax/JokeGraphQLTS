import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
