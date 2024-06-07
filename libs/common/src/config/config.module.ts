import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { configValidationSchema } from './validators/config.schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      validationSchema: configValidationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
