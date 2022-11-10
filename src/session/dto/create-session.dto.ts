import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSessionDto {
    @IsString()
    @IsNotEmpty()
    sessionServer: string;

    @IsString()
    @IsOptional()
    privateIp: string;

    @IsNumber()
    @IsOptional()
    privatPort: number;

    @IsString()
    @IsOptional()
    publicIp: string;

    @IsNumber()
    @IsOptional()
    publicPort: number;
}