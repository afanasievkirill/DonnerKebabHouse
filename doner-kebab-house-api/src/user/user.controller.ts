import { Controller, Get } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {

	constructor(private readonly userService: UserService) { }

	@Get('admin/ambassadors')
	async getAmbassadors(): Promise<UserEntity[]> {
		return await this.userService.find({
			is_ambassador: true
		})
	}
}
