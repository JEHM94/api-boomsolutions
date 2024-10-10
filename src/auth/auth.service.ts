import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    // Ingresa un nuevo registro por medio del Servicio de Users
    async register(registerDto: RegisterDto) {

        // Verifica si el email ingresado ya existe
        const user = await this.usersService.findOneByEmail(registerDto.email)
        if (user)
            throw new BadRequestException('El email ya está en uso');

        // Encripta el Password
        registerDto.password = await bcryptjs.hash(registerDto.password, 10);

        // Crea el nuevo Registro de User
        return await this.usersService.create(registerDto);
    }

    async login({ email, password }: LoginDto) {

        // Verifica si el email ingresado existe
        const user = await this.usersService.findOneByEmail(email)
        if (!user)
            throw new UnauthorizedException('El Email no se encuentra registrado');

        // Verifica si la contraseña ingresada es correcta
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid)
            throw new UnauthorizedException('El Password es incorrecto');

        // Genera el token de Autenticación
        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email
        };
    }
}
