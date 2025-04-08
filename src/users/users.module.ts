import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SendgridService } from 'src/services/sendgrid-service';
import { JwtAuthService } from 'src/services/jwt-service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, SendgridService, JwtAuthService],
})
export class UsersModule {}
