import { Body, Controller, Post, Headers, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateClubDto } from './dto';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private clubService: ClubService) {}
  @Post()
  createClub(
    @Headers('X-AUTH-USR') ownerId: number,
    @Body() createClubDto: CreateClubDto,
  ) {
    return this.clubService.createClub(ownerId, createClubDto);
  }

  @Get()
  getAllClubs(@Headers('X-AUTH-USR') ownerId: number) {
    return this.clubService.getAllClubs(ownerId);
  }

  @Get(':id')
  getClub(@Param('id', ParseIntPipe) clubId: number) { 
    return this.clubService.getClub(clubId);
  }

  @Put(':id')
  updateClub(@Headers('X-AUTH-USR') ownerId: number, @Param('id', ParseIntPipe) clubId: number, @Body() editCluubDto: CreateClubDto) {
    return this.clubService.updateClub(ownerId, clubId, editCluubDto);
  }
}
