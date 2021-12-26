import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SUCCESS_AUTHENTICATION } from './auth.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponce } from './dto/login-user.response';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

	constructor(private readonly userService: UserService) { }

	@Post('admin/register')
	async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
		return await this.userService.createUser(createUserDto);
	}

	@Post('admin/login')
	@HttpCode(200)
	async loginUser(
		@Body() { email, password }: LoginUserDto,
		@Res({ passthrough: true }) res: Response
	): Promise<LoginUserResponce> {
		const user = await this.userService.findByEmail(email);
		const jwt = await this.userService.loginUser(user, password);
		res.cookie('jwt', jwt, { httpOnly: true })
		return {
			message: SUCCESS_AUTHENTICATION,
			jwt
		};
	}

	@Get('admin/user')
	async getUser(@Req() req: Request): Promise<UserEntity> {
		const id = await this.userService.getId(req.cookies['jwt']);
		return await this.userService.findById(id);
	}
}
