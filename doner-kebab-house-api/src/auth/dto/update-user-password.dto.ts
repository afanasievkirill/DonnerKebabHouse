import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	password_confirm: string;
}
