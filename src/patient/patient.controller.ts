import { 
  Controller, 
  Get, 
  Post, 
  Delete, 
  Body, 
  Param, 
  NotFoundException, 
  Put, 
  ParseIntPipe 
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // Get all patients (sorted by arrival time)
  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  // Get a patient by ID
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.patientService.findById(id);
  }

  // Add a new patient
  @Post()
  async create(@Body() patient: Patient): Promise<Patient> {
    return this.patientService.create(patient);
  }

  // Update a patient's details by ID
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updatedPatient: Partial<Patient>
  ): Promise<Patient> {
    return this.patientService.update(id, updatedPatient);
  }
  
  // Delete a patient by ID
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.patientService.delete(id);
  }
}
