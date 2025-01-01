import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kotresh893@',
      database: 'front_desk',
      autoLoadEntities: true,
      synchronize: true, // Use only in development
    }),
    AuthModule,
    QueueModule,
  ],
})
export class AppModule {}