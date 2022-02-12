import { Exclude } from 'class-transformer';
import { OrderEntity } from 'src/order/entity/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column({ unique: true })
	email: string;

	@Exclude()
	@Column()
	password: string;

	@Column({ default: true })
	is_client: boolean;

	@OneToMany(() => OrderEntity, (order) => order.user, { createForeignKeyConstraints: false })
	orders: OrderEntity[];

	get revenue(): number {
		return this.orders.filter((o) => o.complete).reduce((s, o) => s + o.client_revenue, 0);
	}
}
