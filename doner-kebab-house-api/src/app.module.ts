import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LinkModule } from './link/link.module';
import { SharedModule } from './shared/shared.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'root',
			database: 'admin',
			autoLoadEntities: true,
			synchronize: true,
		}),
		AuthModule,
		UserModule,
		ProductModule,
		OrderModule,
		LinkModule,
		SharedModule,
		EventEmitterModule.forRoot(),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
