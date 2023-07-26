import { IsString, IsOptional } from 'class-validator';

export class UserPrefsDto {
  @IsString()
  @IsOptional()
  timezone: string;

  @IsString()
  @IsOptional()
  country: string;
}
