import { IsString, IsOptional } from 'class-validator';

export class UpdateUserPrefsDto {
  @IsString()
  @IsOptional()
  timezone: string;

  @IsString()
  @IsOptional()
  country: string;
}
