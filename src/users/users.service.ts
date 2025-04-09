import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import generateOtp from '../services/generate-otp'
import hashPassword from 'src/services/hash-password';
import { SendgridService } from '../services/sendgrid-service';
import {JwtAuthService} from '../services/jwt-service'
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly sendGridService: SendgridService,
    private readonly jwtService: JwtAuthService
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
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
  
      await this.sendGridService.sendEmail(createUserDto.email, otp)
  
      return 'User Created Successfully';
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(email: string, otp: string) {
    try {
      const user = await this.findOne(email)

      if(user.otp !== otp){
        throw new HttpException('OTP is invalid', HttpStatus.BAD_REQUEST);
      }

      if(user.isEmailVerified === true){
        throw new HttpException('User is already verified', HttpStatus.BAD_REQUEST);
      }

      const now = new Date();
      const otpTime = (now.getTime() - user.otpSentAt.getTime()) / (1000 * 60)

      if(otpTime > 15){
        throw new HttpException('OTP is expired', HttpStatus.BAD_REQUEST);
      }

      await this.userRepository.save({...user, isEmailVerified: true})

      return "Email is Verified";
    } catch (error) {
      throw error
    }
  }

  async resendOtp(email: string) {
    try {
      const user = await this.findOne(email);

      if(!user){
        throw new HttpException('User with the email does not exist', HttpStatus.BAD_REQUEST);
      }

      const otp = generateOtp();

      await this.sendGridService.sendEmail(email, otp)

      await this.userRepository.save({...user, otpSentAt:new Date()})

      return "OTP sent successfully"
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string){
    let accessToken;
    let refreshToken;

    const user = await this.findOne(email)

    if(!user){
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if(!isCorrectPassword){
      throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST)
    }

    accessToken = await this.jwtService.generateAccessToken(user)
    refreshToken = await this.jwtService.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string){
    const payload = await this.verifyRefreshToken(refreshToken);
    const user = await this.findById(payload.sub);

    const newAccessToken = await this.jwtService.generateAccessToken(user);
    const newRefreshToken = await this.jwtService.generateRefreshToken(user);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async verifyRefreshToken(token: string) {
    return await this.jwtService.verifyRefreshToken(token);
  }
  
  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where:{
        email
      }
    })
  }
}
