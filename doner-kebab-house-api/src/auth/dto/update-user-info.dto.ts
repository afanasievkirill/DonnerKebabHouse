import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserInfoDto {
	@IsOptional()
	@IsString()
	first_name: string;

	@IsOptional()
	@IsString()
	last_name: string;

	@IsOptional()
	@IsEmail()
	email: string;
}
