import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {

	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsString()
	image?: string;

	@IsOptional()
	@IsNumber({ maxDecimalPlaces: 2 })
	price?: number;
}