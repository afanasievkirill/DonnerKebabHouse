import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

	constructor(private readonly userService: UserService) { }

	@UseGuards(AuthGuard)
	@Get('admin/clients')
	async getClients(): Promise<UserEntity[]> {
		return await this.userService.find({
			is_client: true
		})
	}
}
