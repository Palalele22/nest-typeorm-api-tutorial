import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserPreferences } from 'src/userprefs/userprefs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPreferences])],
  controllers: [],
  providers: [],
})
export class UserModule {}
