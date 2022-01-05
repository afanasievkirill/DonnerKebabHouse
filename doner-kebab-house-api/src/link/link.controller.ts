import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { LinkEntity } from './link.entity';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {

	constructor(
		private readonly linkService: LinkService
	) { }

	@UseGuards(AuthGuard)
	@Get('admin/users/:id/links')
	async getAllLinks(
		@Param('id') id: number
	): Promise<LinkEntity[]> {
		return await this.linkService.getAllLinkByUserId(id);
	}
}
