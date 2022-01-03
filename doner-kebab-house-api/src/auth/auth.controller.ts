import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Put, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SUCCESS_AUTHENTICATION, SUCCESS_LOGOUT } from './auth.constants';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponce } from './dto/login-user.response';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

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

	@UseGuards(AuthGuard)
	@Get('admin/user')
	async getUser(@Req() req: Request): Promise<UserEntity> {
		const id = await this.userService.getId(req.cookies['jwt']);
		return await this.userService.findById(id);
	}

	@UseGuards(AuthGuard)
	@Post('admin/logout')
	async logoutUser(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('jwt')
		return {
			message: SUCCESS_LOGOUT
		}
	}

	@UseGuards(AuthGuard)
	@Put('admin/user/info')
	async updateUserInfo(
		@Req() req: Request,
		@Body() updateUserDto: UpdateUserInfoDto
	): Promise<UserEntity> {
		const id = await this.userService.getId(req.cookies['jwt']);
		return await this.userService.updateUserInfo(id, updateUserDto);
	}

	@UseGuards(AuthGuard)
	@Put('admin/user/password')
	async updateUserPassword(
		@Req() req: Request,
		@Body() updateUserPasswordDto: UpdateUserPasswordDto
	): Promise<UserEntity> {
		const id = await this.userService.getId(req.cookies['jwt']);
		return await this.userService.updateUserPassword(id, updateUserPasswordDto)
	}
}
