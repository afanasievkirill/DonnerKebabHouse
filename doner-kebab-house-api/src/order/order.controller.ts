import { Controller, Get } from '@nestjs/common';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';

@Controller()
export class OrderController {

	constructor(
		private readonly orderService: OrderService
	) { }

	@Get('admin/orders')
	async getAllOrders(): Promise<OrderEntity[]> {
		return this.orderService.getAllOrders();
	}
}
