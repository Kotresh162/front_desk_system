import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  // Add a new doctor
  async addDoctor(
    name: string,
    course: string,
    specialization: string,
    ratings: number,
    description: string,
  ): Promise<Doctor> {
    const newDoctor = this.doctorRepository.create({ name, course, specialization, ratings, description });
    return this.doctorRepository.save(newDoctor);
  }

  // Update doctor details
  async updateDoctor(id: number, updateData: Partial<Doctor>): Promise<Doctor> {
    await this.doctorRepository.update(id, updateData);
    return this.doctorRepository.findOne({ where: { id } });
  }

  // Delete a doctor by ID
  async deleteDoctor(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }

  // Get all doctors
  async getAllDoctors(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }
}
