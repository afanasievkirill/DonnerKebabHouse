import { Body, CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_BACKEND_CASH_KEY, PRODUCT_DELETE_IS_SUCCESS, PRODUCT_FRONTEND_CASH_KEY, PRODUCT_UPDATED_EVENT } from './product.constants';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class ProductController {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly productService: ProductService,
		private eventEmitter: EventEmitter2
	) { }

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
		const product = await this.productService.createProduct(createProductDto);
		this.eventEmitter.emit(PRODUCT_UPDATED_EVENT);
		return product;
	}

	@UseGuards(AuthGuard)
	@Put('admin/products/:id')
	async updateProduct(
		@Param('id') id: number,
		@Body() updateProductDto: UpdateProductDto
	): Promise<ProductEntity> {
		const product = await this.productService.updateProduct(id, updateProductDto);
		this.eventEmitter.emit(PRODUCT_UPDATED_EVENT);
		return product;
	}

	@UseGuards(AuthGuard)
	@Delete('admin/products/:id')
	async deleteProduct(
		@Param('id') id: number
	) {
		await this.productService.deleteProduct(id);
		this.eventEmitter.emit(PRODUCT_UPDATED_EVENT);
		return {
			message: PRODUCT_DELETE_IS_SUCCESS
		}
	}

	@UseGuards(AuthGuard)
	@CacheKey(PRODUCT_FRONTEND_CASH_KEY)
	@CacheTTL(30 * 60)
	@UseInterceptors(CacheInterceptor)
	@Get('client/products/frontend')
	async getProductsToFrontend(): Promise<ProductEntity[]> {
		return await this.productService.getAllProducts();
	}

	@Get('client/products/backend')
	async getProductsToBackend(): Promise<any> {
		let products = await this.cacheManager.get(PRODUCT_BACKEND_CASH_KEY);
		if (!products) {
			products = await this.productService.getAllProducts()
			console.log(products)
			await this.cacheManager.set(
				PRODUCT_BACKEND_CASH_KEY,
				products,
				{ ttl: 30 * 60 }
			);
		}
		return products;

	}


}
