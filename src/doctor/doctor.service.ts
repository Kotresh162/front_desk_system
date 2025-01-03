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
    location: string,
    availability: 'free' | 'busy' | 'offduty', // Restrict to allowed values
  ): Promise<Doctor> {
    const newDoctor = this.doctorRepository.create({
      name,
      course,
      specialization,
      ratings,
      description,
      location,
      availability,
    });
    return this.doctorRepository.save(newDoctor);
  }

    // Get a single doctor by ID
  async getDoctorById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({where : {id}});
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }



  // Update doctor details
  async updateDoctor(
    id: number,
    updateData: Partial<Doctor>,
  ): Promise<Doctor> {
    // Validate availability if it's being updated
    if (updateData.availability && !['free', 'busy', 'offduty'].includes(updateData.availability)) {
      throw new Error('Invalid availability status');
    }

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

  // Get doctors by availability
  async getDoctorsByAvailability(
    availability: 'free' | 'busy' | 'offduty',
  ): Promise<Doctor[]> {
    return this.doctorRepository.find({ where: { availability } });
  }
}
