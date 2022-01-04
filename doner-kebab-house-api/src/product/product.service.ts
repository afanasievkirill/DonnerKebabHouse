import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_NOT_FOUND_ERROR, TITLE_ARE_TAKEN_ERROR, TITLE_NOT_FOUND_ERROR } from './product.constants';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
	) { }

	async getAllProducts(): Promise<ProductEntity[]> {
		return await this.productRepository.find();
	}

	async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
		const product = await this.findByTitle(createProductDto.title)
		if (product) {
			throw new UnprocessableEntityException(TITLE_ARE_TAKEN_ERROR);
		}
		return await this.productRepository.save(createProductDto);
	}

	async findByTitle(title: string): Promise<ProductEntity> {
		const product = await this.productRepository.findOne({ title })
		if (!product) {
			throw new NotFoundException(TITLE_NOT_FOUND_ERROR);
		}
		return product
	}

	async findById(id: number): Promise<ProductEntity> {
		const product = await this.productRepository.findOne(id)
		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return product;
	}

	async updateProduct(
		id: number,
		updateProductDto: UpdateProductDto
	): Promise<ProductEntity> {
		if (updateProductDto.title) {
			const productByTitle = await this.productRepository.findOne({ title: updateProductDto.title })
			if (productByTitle) {
				throw new UnprocessableEntityException(TITLE_ARE_TAKEN_ERROR);
			}
		}
		await this.productRepository.update(id, updateProductDto);
		return this.findById(id);
	}

	async deleteProduct(id: number) {
		await this.findById(id);
		await this.productRepository.delete(id)
	}
}
