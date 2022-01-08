import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { ProductListener } from './listeners/product.listener';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    SharedModule
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductListener
  ]
})
export class ProductModule { }
