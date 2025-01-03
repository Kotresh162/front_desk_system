import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Doctor module imports
import { DoctorService } from './doctor/doctor.service';
import { DoctorController } from './doctor/doctor.controller';
import { Doctor } from './doctor/doctor.entity';

// Patient module imports
import { PatientModule } from './patient/patient.module';
import { Patient } from './patient/patient.entity';

@Module({
  imports: [
    // Configure the TypeORM connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql12.freesqldatabase.com',
      port: 3306,
      username: 'sql12755505',
      password: 'DBAzPDVACH',
      database: 'sql12755505',
      entities: [Doctor, Patient], // Include both Doctor and Patient entities
      synchronize: true, // Use synchronize only in development (set to false in production)
    }),
    // Register the Doctor and Patient entities with TypeORM
    TypeOrmModule.forFeature([Doctor, Patient]),
    
    // JWT module for authentication
    JwtModule.register({
      secret: 'secretKey', // Replace with a secure key in production
      signOptions: { expiresIn: '1h' },
    }),
    
    // Import the PatientModule
    PatientModule,
  ],
  providers: [DoctorService],
  controllers: [DoctorController],
})
export class AppModule {}
