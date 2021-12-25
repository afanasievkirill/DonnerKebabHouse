import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

	@IsNotEmpty()
	@IsString()
	first_name: string;

	@IsNotEmpty()
	@IsString()
	last_name: string;

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	password_confirm: string;

}