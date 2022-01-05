import { OrderEntity } from "src/order/entity/order.entity";
import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('links')
export class LinkEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	code: string;

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;

	@ManyToMany(() => ProductEntity)
	@JoinTable({
		name: 'link_products',
		joinColumn: {
			name: 'link_id',
			referencedColumnName: 'id'
		},
		inverseJoinColumn: {
			name: 'product_id',
			referencedColumnName: 'id'
		}
	})
	products: ProductEntity[];

	@OneToMany(() => OrderEntity, order => order.link, {
		createForeignKeyConstraints: false
	})
	@JoinColumn({
		referencedColumnName: 'code',
		name: 'code'
	})
	orders: OrderEntity[];
}