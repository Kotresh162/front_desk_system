import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Login a user by generating a JWT token
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  // Create a new user
  async createUser(username: string, password: string, role: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, password: hashedPassword, role });
    return this.userRepository.save(newUser);
  }

  // Update user details
  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Find a user by username
  async findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
}
