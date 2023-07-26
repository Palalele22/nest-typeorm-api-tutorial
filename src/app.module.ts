import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserprefsModule } from './userprefs/userprefs.module';
import { ClubModule } from './club/club.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { UserPreferences } from './userprefs/userprefs.entity';
import { Club } from './club/club.entity';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: [User, UserPreferences, Club]
  }),
    UserModule,
    UserprefsModule,
    ClubModule,
  ],
})
export class AppModule {}
