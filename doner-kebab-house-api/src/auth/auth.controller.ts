import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Put, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SUCCESS_AUTHENTICATION, SUCCESS_LOGOUT } from './auth.constants';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetClientResponse } from './dto/get-client.response';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResponce } from './dto/login-user.response';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

	constructor(private readonly userService: UserService) { }

	@Post(['admin/register', 'client/register'])
	async createUser(
		@Req() req: Request,
		@Body() createUserDto: CreateUserDto
	): Promise<UserEntity> {
		const isClient = (req.path === '/api/client/register');
		return await this.userService.createUser(createUserDto, isClient);
	}

	@Post(['admin/login', 'client/login'])
	@HttpCode(200)
	async loginUser(
		@Body() { email, password }: LoginUserDto,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	): Promise<LoginUserResponce> {
		const adminLogin = (req.path === '/api/admin/login');
		const user = await this.userService.findByEmail(email);
		const jwt = await this.userService.loginUser(user, password, adminLogin);
		res.cookie('jwt', jwt, { httpOnly: true })
		return {
			message: SUCCESS_AUTHENTICATION,
			jwt
		};
	}

	@UseGuards(AuthGuard)
	@Get(['admin/user', 'client/user'])
	async getUser(@Req() req: Request): Promise<UserEntity | GetClientResponse> {
		const id = await this.userService.getId(req.cookies['jwt']);
		if (req.path === '/api/admin/user') {
			return await this.userService.findById(id);
		}
		const client = await this.userService.findOne({
			where: { id },
			relations: ['orders', 'orders.order_items']
		});
		const { orders, password, ...data } = client
		return {
			...data,
			revenue: client.revenue
		};
	}

	@UseGuards(AuthGuard)
	@Post(['admin/logout', 'client/logout'])
	async logoutUser(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('jwt')
		return {
			message: SUCCESS_LOGOUT
		}
	}

	@UseGuards(AuthGuard)
	@Put(['admin/user/info', 'client/user/info'])
	async updateUserInfo(
		@Req() req: Request,
		@Body() updateUserDto: UpdateUserInfoDto
	): Promise<UserEntity> {
		const id = await this.userService.getId(req.cookies['jwt']);
		return await this.userService.updateUserInfo(id, updateUserDto);
	}

	@UseGuards(AuthGuard)
	@Put(['admin/user/password', 'client/user/password'])
	async updateUserPassword(
		@Req() req: Request,
		@Body() updateUserPasswordDto: UpdateUserPasswordDto
	): Promise<UserEntity> {
		const id = await this.userService.getId(req.cookies['jwt']);
		return await this.userService.updateUserPassword(id, updateUserPasswordDto)
	}
}
