import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isEmpty } from 'class-validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userExists = await this.findOne(createUserDto.email)

      if(userExists){
        throw new HttpException('User with email already exist', HttpStatus.BAD_REQUEST);
      }
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('/login')
  async login(@Body('email') email:string, @Body('password') password:string){
    try {
      return await this.usersService.login(email, password)
    } catch (error) {
      throw error;
    }
  }

  @Get('/verify-email')
  verifyEmail(@Body('email') email: string, @Body('otp') otp:string) {
    try {
      return this.usersService.verifyEmail(email, otp);
    } catch (error) {
      throw error;
    }
  }

  @Get('/resend-otp')
  resendOtp(@Body('email') email: string) {
    try {
      return this.usersService.resendOtp(email);
    } catch (error) {
      throw error;
    }
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    try {
      if(isEmpty(email)){
        return "Email field cannot be empty"
      }
      return await this.usersService.findOne(email);
    } catch (error) {
      throw error;
    }
  }
}
