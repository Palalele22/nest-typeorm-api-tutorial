import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ResetPasswordDto } from './dto';
import { promisify } from 'util';
import { scryptSync } from 'crypto';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { UserPreferences } from 'src/userprefs/userprefs.entity';
import { UpdateUserPrefsDto } from 'src/userprefs/dto';

const scryptAsync = promisify(scryptSync);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserPreferences)
    private readonly userPreferencesRepository: Repository<UserPreferences>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: AuthDto, updateUserPrefsDto: UpdateUserPrefsDto) {
    //generate pass hash
    const hash = await argon.hash(signupDto.password);

    try {
      const newUser = this.userRepository.create({
        name: signupDto.name,
        email: signupDto.email,
        passwordHash: hash,
      });

      const user = await this.userRepository.save(newUser);

      //create a new userpreference entry
      const userPreferences = new UserPreferences();
      userPreferences.timezone = updateUserPrefsDto.timezone;
      userPreferences.country = updateUserPrefsDto.country;
      userPreferences.user = user;

      await this.userPreferencesRepository.save(userPreferences);

      return this.signToken(user.id, user.email, user.name);
    } catch (error) {
      if (error.code === '23505') {
        throw new ForbiddenException('Credentials taken');
      }
      throw error;
    }
  }

  async signin(signinDto: AuthDto) {
    //find user by email
    const user = await this.userRepository.findOne({
      where: {
        email: signinDto.email,
      },
    });

    //if user doesn t exist, throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    //compare pass
    const pwMatches = await argon.verify(user.passwordHash, signinDto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email, user.name);
  }

  async resetPassword(resetPassDto: ResetPasswordDto) {
    const { email } = resetPassDto;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException('User with this email not found');

    //generate random pass
    const randomPassword = Math.random().toString(36).slice(-8);
    const randomPasswordWithNumbers = `${randomPassword.substring(
      0,
      8,
    )}${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')}`;

    //hash new password
    const passwordHash = await argon.hash(randomPasswordWithNumbers);

    //update password in the database
    user.passwordHash = passwordHash;
    await this.userRepository.save(user);

    return randomPasswordWithNumbers;
  }

  async signToken(
    userId: number,
    email: string,
    name: string,
  ): Promise<{ acces_token: string }> {
    const payload = {
      sub: userId,
      name: name,
      email,
    };
    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { acces_token: token };
  }
}
