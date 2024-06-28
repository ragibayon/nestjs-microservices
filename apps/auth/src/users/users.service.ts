import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto';
import type { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    await this.validateCreateUser(createUserDto);
    return await this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async find(): Promise<UserDocument[]> {
    return await this.usersRepository.find({});
  }

  async findOne(_id: string): Promise<UserDocument> {
    return await this.usersRepository.findOne({ _id });
  }

  async update(_id: string, updateUserDto): Promise<UserDocument> {
    return await this.usersRepository.findOneAndUpdate(
      { _id },
      { $set: updateUserDto },
    );
  }

  async remove(_id: string): Promise<UserDocument> {
    return await this.usersRepository.findOneAndDelete({ _id });
  }

  async verifyUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto): Promise<UserDocument> {
    return await this.usersRepository.findOne(getUserDto);
  }

  private async validateCreateUser(
    createUserDto: CreateUserDto,
  ): Promise<void> {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists.');
  }
}
