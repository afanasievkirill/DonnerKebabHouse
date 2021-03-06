import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { OrderItemEntity } from './entity/order-item.entity';
import { OrderItemService } from './order-item.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
	imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]), SharedModule],
	providers: [OrderService, OrderItemService],
	controllers: [OrderController],
})
export class OrderModule {}
