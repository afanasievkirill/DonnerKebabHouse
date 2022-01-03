import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmbassadorUserDto, CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';
import { PASSWORD_ARE_NOT_VALID_ERROR, PASSWORD_DO_NOT_MATCH_ERROR, USER_NOT_FOUND_ERROR } from './user.constants';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserInfoDto } from 'src/auth/dto/update-user-info.dto';
import { UpdateUserPasswordDto } from 'src/auth/dto/update-user-password.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private jwtService: JwtService
	) { }

	async createUser(createUserDto: CreateUserDto | AmbassadorUserDto): Promise<UserEntity> {
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

	async findByEmail(email: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		};
		return user;
	}

	async findById(id: number): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ id });
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		};
		return user;
	}

	async find(options: any): Promise<UserEntity[]> {
		return this.userRepository.find(options);
	}

	async loginUser(user: UserEntity, dtoPassword: string): Promise<string> {
		const validPassword = await bcrypt.compare(dtoPassword, user.password);
		if (!validPassword) {
			throw new BadRequestException(PASSWORD_ARE_NOT_VALID_ERROR)
		};
		const Jwt = await this.jwtService.signAsync({
			id: user.id
		})
		return Jwt;
	}

	async updateUserInfo(
		id: number,
		updateUserInfoDto: UpdateUserInfoDto
	): Promise<UserEntity> {
		await this.userRepository.update(id, updateUserInfoDto);
		return this.findById(id);
	}

	async updateUserPassword(
		id: number,
		updateUserPasswordDto: UpdateUserPasswordDto
	): Promise<UserEntity> {
		if (updateUserPasswordDto.password !== updateUserPasswordDto.password_confirm) {
			throw new BadRequestException(PASSWORD_DO_NOT_MATCH_ERROR);
		}
		await this.userRepository.update(id, {
			password: await bcrypt.hash(updateUserPasswordDto.password, 12)
		})
		return this.findById(id);
	}

	async getId(jwt: string): Promise<number> {
		const { id } = await this.jwtService.verifyAsync(jwt);
		return id;
	}

}
