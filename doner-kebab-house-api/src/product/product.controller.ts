import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_DELETE_IS_SUCCESS } from './product.constants';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@Get('admin/products')
	async getAllProducts(): Promise<ProductEntity[]> {
		return await this.productService.getAllProducts()
	}

	@Get('admin/products/:id')
	async getProduct(
		@Param('id') id: number
	): Promise<ProductEntity> {
		return await this.productService.findById(id);
	}

	@Post('admin/products')
	async createProduct(
		@Body() createProductDto: CreateProductDto
	): Promise<ProductEntity> {
		return await this.productService.createProduct(createProductDto)
	}

	@Put('admin/products/:id')
	async updateProduct(
		@Param('id') id: number,
		@Body() updateProductDto: UpdateProductDto
	): Promise<ProductEntity> {
		return await this.productService.updateProduct(id, updateProductDto)
	}

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
