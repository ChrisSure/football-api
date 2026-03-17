import {
  Injectable,
  NotFoundException,
  ConflictException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { name: createUserDto.name },
    });

    if (existingUser) {
      throw new ConflictException('User with this name already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      name: createUserDto.name,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.name && updateUserDto.name !== user.name) {
      const existingUser = await this.userRepository.findOne({
        where: { name: updateUserDto.name },
      });

      if (existingUser) {
        throw new ConflictException('User with this name already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);
  }
}
