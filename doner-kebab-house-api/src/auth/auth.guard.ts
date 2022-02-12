import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ADMIN_SCOPE, CLIENT_SCOPE } from './auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		try {
			const jwt = request.cookies['jwt'];
			const { scope } = await this.jwtService.verify(jwt);
			const is_client = request.path.toString().indexOf('api/client') >= 0;
			return (is_client && scope === CLIENT_SCOPE) || (!is_client && scope === ADMIN_SCOPE);
		} catch (e) {
			return false;
		}
	}
}
