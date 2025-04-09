import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { applicationConfig } from '../../../config/application-config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwtToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: applicationConfig.jwt.secret
        }
      );
      request['user'] = payload;
    } catch(error) {
      console.error("JWT verification error:", error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractJwtToken(request: any): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }
}