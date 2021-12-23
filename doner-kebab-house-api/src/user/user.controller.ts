import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {

	@Get()
	allUser(): string[] {
		return ['users']
	}
}
