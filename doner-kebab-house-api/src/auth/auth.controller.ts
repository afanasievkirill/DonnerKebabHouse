import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AuthController {

	constructor(private readonly userService: UserService) { }

	@Post('admin/register')
	async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
		return await this.userService.createUser(createUserDto);
	}
}
