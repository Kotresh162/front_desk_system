import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from './doctor/doctor.service';
import { DoctorController } from './doctor/doctor.controller';
import { Doctor } from './doctor/doctor.entity';
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
      entities: [Doctor],
      synchronize: true, // Use only in development
    }),
    TypeOrmModule.forFeature([Doctor]),
    JwtModule.register({
      secret: 'secretKey', // Replace with a secure key in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [DoctorService],
  controllers: [DoctorController],
})
export class AppModule {}
