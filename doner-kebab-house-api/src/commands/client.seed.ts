import { NestFactory } from '@nestjs/core';
import faker from 'faker';
import { AppModule } from 'src/app.module';
import { UserService } from 'src/user/user.service';

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule);

	const userService = app.get(UserService);

	const password = '1234';

	for (let i = 0; i < 30; i++) {
		await userService.createUser(
			{
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				email: faker.internet.email(),
				password,
				password_confirm: password,
				is_client: true,
			},
			true,
		);
	}

	process.exit();
}
bootstrap();
