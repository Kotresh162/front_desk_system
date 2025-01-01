import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { User } from './auth/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kotresh893@',
      database: 'front_desk',
      entities: [User],
      synchronize: true, // Use only in development
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey', // Replace with a secure key in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AppModule {}
