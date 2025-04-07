import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import generateOtp from '../services/generate-otp'
import hashPassword from 'src/services/hash-password';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const otp = await generateOtp();

    const hashedPassword = await hashPassword(createUserDto.password);

    await this.userRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.firstName,
      email: createUserDto.email,
      password: hashedPassword,
      otp: otp,
      otpSentAt: new Date(),
    });
    return 'User Created Successfully';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
