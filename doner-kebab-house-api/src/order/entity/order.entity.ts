import { Exclude, Expose } from 'class-transformer';
import { LinkEntity } from 'src/link/link.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity('orders')
export class OrderEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	transaction_id: string;

	@Column()
	user_id: number;

	@Column()
	code: string;

	@Column()
	client_email: string;

	@Exclude()
	@Column()
	first_name: string;

	@Exclude()
	@Column()
	last_name: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	address: string;

	@Column({ nullable: true })
	country: string;

	@Column({ nullable: true })
	city: string;

	@Column({ nullable: true })
	zip: string;

	@Exclude()
	@Column({ default: false })
	complete: boolean;

	@OneToMany(() => OrderItemEntity, (ordetItemEntity) => ordetItemEntity.order)
	order_items: OrderItemEntity[];

	@ManyToOne(() => LinkEntity, (link) => link.orders, {
		createForeignKeyConstraints: false,
	})
	@JoinColumn({
		referencedColumnName: 'code',
		name: 'code',
	})
	link: LinkEntity;

	@ManyToOne(() => UserEntity, (user) => user.orders, {
		createForeignKeyConstraints: false,
	})
	user: UserEntity;

	@Expose()
	get name(): string {
		return `${this.first_name} ${this.last_name}`;
	}

	@Expose()
	get total(): number {
		return this.order_items.reduce((s, i) => s + i.admin_revenue, 0);
	}

	get client_revenue(): number {
		return this.order_items.reduce((s, i) => s + i.client_revenue, 0);
	}
}
