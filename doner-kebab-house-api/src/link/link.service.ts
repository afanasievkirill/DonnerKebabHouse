import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_NOT_FOUND_BY_ID_ERROR } from 'src/user/user.constants';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { LinkEntity } from './link.entity';

@Injectable()
export class LinkService {
	constructor(
		@InjectRepository(LinkEntity) private readonly linkRepository: Repository<LinkEntity>,
		private readonly userService: UserService,
	) {}

	async getAllLinkByUserId(id: number): Promise<LinkEntity[]> {
		const user = await this.userService.findById(id);
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_BY_ID_ERROR);
		}
		return await this.linkRepository.find({
			where: { user: id },
			relations: ['orders', 'orders.order_items'],
		});
	}
}
