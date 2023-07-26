import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserPreferences } from './userprefs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserPrefsDto } from './dto';

@Injectable()
export class UserprefsService {
  constructor(
    @InjectRepository(UserPreferences)
    private userPreferencesRepository: Repository<UserPreferences>,
  ) {}
  async updatePreferences(userId: number, updatePrefsDto: UpdateUserPrefsDto) {
    try {
      const userPrefs = await this.userPreferencesRepository.findOne({
        where: { user: { id: userId } },
      });
      const { timezone, country } = updatePrefsDto;

      //update
      userPrefs.timezone = timezone;
      userPrefs.country = country;
      await this.userPreferencesRepository.save(userPrefs);

      return userPrefs;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
