import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';
import { PASSWORD_DO_NOT_MATCH_ERROR } from './user.constants';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) { }

	async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const { password_confirm, ...newUser } = createUserDto
		if (createUserDto.password !== password_confirm) {
			throw new BadRequestException(PASSWORD_DO_NOT_MATCH_ERROR);
		}
		const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

		return await this.userRepository.save(
			{
				...newUser,
				password: hashedPassword,
				is_ambassador: false
			});
	}

}
