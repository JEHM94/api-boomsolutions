import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService
  ) { }


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    // Obtiene la información de la petición Http 
    const request = context.switchToHttp().getRequest();

    // Verifica si la petición contiene un token
    const token = this.extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException();


    try {
      // Verifica el token y el secret
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.secret
        }
      );
      // Asigna el payload al Request, este contiene el email del Usuario 
      request['user'] = payload

    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  // Extrae el token del Request
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
