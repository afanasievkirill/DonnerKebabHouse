import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
	PRODUCT_BACKEND_CASH_KEY,
	PRODUCT_FRONTEND_CASH_KEY,
	PRODUCT_UPDATED_EVENT,
} from '../product.constants';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductListener {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	@OnEvent(PRODUCT_UPDATED_EVENT)
	async handleProductUpdatedEvent() {
		await this.cacheManager.del(PRODUCT_FRONTEND_CASH_KEY);
		await this.cacheManager.del(PRODUCT_BACKEND_CASH_KEY);
	}
}
