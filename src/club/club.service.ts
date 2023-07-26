import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClubDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './club.entity';
import { Not, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createClub(ownerId: number, createClubDto: CreateClubDto) {
    try {
      if (ownerId) {
        const currentUser = await this.userRepository.findOne({
          where: {
            id: ownerId,
          },
        });

        const createdClub = new Club();
        createdClub.address = createClubDto.address;
        createdClub.name = createClubDto.name;
        createdClub.owner = currentUser;

        await this.clubRepository.save(createdClub);

        return createdClub;
      } else
        return new ForbiddenException(
          'X-AUTH-USR must be present in order to create club',
        );
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async getAllClubs(ownerId: number) {
    try {
      if (ownerId) {
        return await this.clubRepository.find({
          where: {
            owner: {
              id: ownerId,
            },
          },
        });
      } else
        throw new ForbiddenException(
          'X-AUTH-USR must be present in order to get all club',
        );
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async getClub(clubId: number) {
    const club = await this.clubRepository.findOne({
      where: {
        id: clubId,
      },
    });
    if (!club) throw new NotFoundException('Club not found');
    return club;
  }

  async updateClub(
    ownerId: number,
    clubId: number,
    editClubDto: CreateClubDto,
  ) {
    try {
      if (ownerId) {
        const club = await this.clubRepository.findOne({
          where: {
            id: clubId,
          },
        });
        //update
        const { address, name } = editClubDto;
        club.address = address;
        club.name = name;
        await this.clubRepository.save(club);

        return club
      } else {
        throw new NotFoundException('X-AUTH-USR must be present in order to edit club')
      }
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
