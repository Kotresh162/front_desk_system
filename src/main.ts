import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS
    app.enableCors({
        origin: 'http://localhost:3000', // Your frontend's origin
        methods: 'GET,POST,PUT,DELETE',
        credentials: true, // If you need to send cookies or headers
    });

    await app.listen(5000);
}
bootstrap();
