import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  // Fetch all patients sorted by arrival time
  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find({ order: { arrivalTime: 'ASC' } });
  }

  // Find a patient by ID
  async findById(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  // Create a new patient
  async create(patient: Patient): Promise<Patient> {
    const newPatient = this.patientRepository.create(patient);
    return this.patientRepository.save(newPatient);
  }

  // Update a patient's details by ID
  async update(id: number, updatedPatient: Partial<Patient>): Promise<Patient> {
    const patient = await this.findById(id);
    Object.assign(patient, updatedPatient); // Apply partial updates
    return this.patientRepository.save(patient);
  }

  // Delete a patient by ID
  async delete(id: number): Promise<void> {
    const result = await this.patientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}
