import { IsOptional, IsString } from "class-validator";

export class CreateClubDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    address: string;
}