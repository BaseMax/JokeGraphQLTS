import { Global, Module } from '@nestjs/common';
import { HashService } from './services/hash.service';

const providers = [HashService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModules {}
