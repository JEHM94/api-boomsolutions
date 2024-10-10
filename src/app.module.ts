import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() + '/.env.development' });

@Module({
  imports: [
    //TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // Colocar false para producción
    }),
    // App Modules
    ProductModule,
    UsersModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
