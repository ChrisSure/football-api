import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Project } from '../../project/entities/project.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['projects'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['projects'],
    });

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

    if (createUserDto.projectIds && createUserDto.projectIds.length > 0) {
      const projects = await this.projectRepository.findBy({
        id: In(createUserDto.projectIds),
      });

      if (projects.length !== createUserDto.projectIds.length) {
        throw new NotFoundException('One or more projects not found');
      }

      user.projects = projects;
    }

    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['projects'],
    });

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

    if (updateUserDto.projectIds !== undefined) {
      if (updateUserDto.projectIds.length > 0) {
        const projects = await this.projectRepository.findBy({
          id: In(updateUserDto.projectIds),
        });

        if (projects.length !== updateUserDto.projectIds.length) {
          throw new NotFoundException('One or more projects not found');
        }

        user.projects = projects;
      } else {
        user.projects = [];
      }
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.status) {
      user.status = updateUserDto.status;
    }

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['projects'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);
  }

  async changePassword(id: number, newPassword: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    return await this.userRepository.save(user);
  }
}
