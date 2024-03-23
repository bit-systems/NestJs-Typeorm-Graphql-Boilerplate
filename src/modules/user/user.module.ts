import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/libs/core/auth/auth.module';
import { JwtAuthGuard } from '@src/libs/core/auth/guards/jwt-auth-guard';
import { UserEntity } from '@src/libs/db/entities';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],

  providers: [
    UserResolver,
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class UserModule {}
