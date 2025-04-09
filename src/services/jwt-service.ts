import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { applicationConfig } from 'config/application-config';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class JwtAuthService{
    constructor(
        private jwtService: JwtService
    ){}

    async generateAccessToken(user: User){
        const payload = { email: user.email, firstname: user.firstName, sub: user.id };
        return this.jwtService.sign(payload,{
            secret: applicationConfig.jwt.secret
        })
    }

    async generateRefreshToken(user: User) {
        const payload = { sub: user.id };
        return this.jwtService.sign(payload, {
          secret: applicationConfig.jwt.refreshSecret,
          expiresIn: '7d',
        });
      }
    
      async verifyRefreshToken(token: string) {
        try {
          const payload = await this.jwtService.verifyAsync(token, {
            secret: applicationConfig.jwt.refreshSecret,
          });
          return payload;
        } catch (error) {
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
    
}