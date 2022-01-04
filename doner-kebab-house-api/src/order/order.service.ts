import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entity/order.entity';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>
	) { }

	async getAllOrders(): Promise<OrderEntity[]> {
		return await this.orderRepository.find();
	}
}
