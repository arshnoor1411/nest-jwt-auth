import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { applicationConfig } from 'config/application-config';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class JwtAuthService{
    constructor(
        private jwtService: JwtService
    ){}

    async generateToken(user: User){
        const payload = { email: user.email, firstname: user.firstName, sub: user.id };
        return this.jwtService.sign(payload,{
            secret: applicationConfig.jwt.secret
        })
    }
}