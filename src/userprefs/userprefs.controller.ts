import { Body, Controller, Put, Headers } from '@nestjs/common';
import { UserprefsService } from './userprefs.service';
import { UpdateUserPrefsDto } from './dto';

@Controller('userprefs')
export class UserprefsController {
  constructor(private userPrefsService: UserprefsService) {}
  @Put('update-preferences')
  updatePreferences(@Headers('X-AUTH-USR') userId:number, @Body() updatePrefsDto: UpdateUserPrefsDto) {
    return this.userPrefsService.updatePreferences(userId, updatePrefsDto);
  }
}
