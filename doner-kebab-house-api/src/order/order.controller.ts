import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderEntity } from './entity/order.entity';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@UseGuards(AuthGuard)
	@UseInterceptors(ClassSerializerInterceptor)
	@Get('admin/orders')
	async getAllOrders(): Promise<OrderEntity[]> {
		return this.orderService.getAllOrders();
	}
}
