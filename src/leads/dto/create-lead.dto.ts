import { IsEmail, IsOptional, IsString, IsNotEmpty, IsIP } from 'class-validator';

export class CreateLeadDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsIP()
    @IsNotEmpty()
    ip: string;

    @IsOptional()
    @IsString()
    utmSource?: string;

    @IsOptional()
    @IsString()
    utmMedium?: string;

    @IsOptional()
    @IsString()
    utmCampaign?: string;

    @IsOptional()
    @IsString()
    utmContent?: string;
}
