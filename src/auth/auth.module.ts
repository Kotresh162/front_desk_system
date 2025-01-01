import { Controller, Post, Put, Delete, Get, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint to create a new user
  @Post()
  async createUser(
    @Body() body: { username: string; password: string; role: string },
  ) {
    return this.authService.createUser(body.username, body.password, body.role);
  }

  // Endpoint to update an existing user
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: Partial<{ username: string; password: string; role: string }>,
  ) {
    return this.authService.updateUser(id, body);
  }

  // Endpoint to delete a user
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.authService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

  // Endpoint to get all users
  @Get()
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
