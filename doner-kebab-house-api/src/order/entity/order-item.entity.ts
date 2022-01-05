import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity('order_items')
export class OrderItemEntity {


	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	product_title: string;

	@Column()
	quantity: number;

	@Column()
	price: number;

	@Column()
	admin_revenue: number;

	@Column()
	client_revenue: number;

	@ManyToOne(() => OrderEntity, orderEntity => orderEntity.order_items)
	@JoinColumn({ name: 'order_id' })
	order: OrderEntity;
}