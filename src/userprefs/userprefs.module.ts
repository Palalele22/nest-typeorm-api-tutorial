import { Module } from '@nestjs/common';
import { UserprefsController } from './userprefs.controller';
import { UserprefsService } from './userprefs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPreferences } from './userprefs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPreferences])],
  controllers: [UserprefsController],
  providers: [UserprefsService]
})
export class UserprefsModule {}
