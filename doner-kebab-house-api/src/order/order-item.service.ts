import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './entity/order-item.entity';

@Injectable()
export class OrderItemService {
	constructor(
		@InjectRepository(OrderItemEntity)
		private readonly orderItemRepository: Repository<OrderItemEntity>,
	) {}
}
