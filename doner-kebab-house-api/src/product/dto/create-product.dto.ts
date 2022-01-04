import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	image: string;

	@IsNumber({ maxDecimalPlaces: 2 })
	price: number;
}