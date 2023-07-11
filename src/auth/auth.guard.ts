import { CanActivate, Inject, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject('ACCESS_JWT_SERVICE')
    private jwtService: JwtService
  ) {}

  public extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
  }

  public async validateToken(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token) {
      throw new UnauthorizedException();
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(token);

    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.validateToken(context)
  }

}