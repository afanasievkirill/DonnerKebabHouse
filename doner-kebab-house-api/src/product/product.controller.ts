import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_DELETE_IS_SUCCESS } from './product.constants';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@UseGuards(AuthGuard)
	@Get('admin/products')
	async getAllProducts(): Promise<ProductEntity[]> {
		return await this.productService.getAllProducts()
	}

	@UseGuards(AuthGuard)
	@Get('admin/products/:id')
	async getProduct(
		@Param('id') id: number
	): Promise<ProductEntity> {
		return await this.productService.findById(id);
	}

	@UseGuards(AuthGuard)
	@Post('admin/products')
	async createProduct(
		@Body() createProductDto: CreateProductDto
	): Promise<ProductEntity> {
		return await this.productService.createProduct(createProductDto)
	}

	@UseGuards(AuthGuard)
	@Put('admin/products/:id')
	async updateProduct(
		@Param('id') id: number,
		@Body() updateProductDto: UpdateProductDto
	): Promise<ProductEntity> {
		return await this.productService.updateProduct(id, updateProductDto)
	}

	@UseGuards(AuthGuard)
	@Delete('admin/products/:id')
	async deleteProduct(
		@Param('id') id: number
	) {
		await this.productService.deleteProduct(id);
		return {
			message: PRODUCT_DELETE_IS_SUCCESS
		}
	}


}
