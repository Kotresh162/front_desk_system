import { Controller, Post, Put, Delete, Get, Body, Param, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // Endpoint to add a new doctor
  @Post()
  async addDoctor(
    @Body()
    body: {
      name: string;
      course: string;
      specialization: string;
      ratings: number;
      description: string;
      location: string;
      availability: 'free' | 'busy' | 'offduty'; // Restrict to allowed values
    },
  ) {
    return this.doctorService.addDoctor(
      body.name,
      body.course,
      body.specialization,
      body.ratings,
      body.description,
      body.location,
      body.availability,
    );
  }

  // Endpoint to update an existing doctor
  @Put(':id')
  async updateDoctor(
    @Param('id') id: number,
    @Body()
    body: Partial<{
      name: string;
      course: string;
      specialization: string;
      ratings: number;
      description: string;
      location: string;
      availability: 'free' | 'busy' | 'offduty';
    }>,
  ) {
    return this.doctorService.updateDoctor(id, body);
  }


    // Endpoint to get a single doctor by ID
    @Get(':id')
    async getDoctorById(@Param('id') id: number) {
      const doctor = await this.doctorService.getDoctorById(id);
      if (!doctor) {
        return { message: `Doctor with ID ${id} not found` }; // Instead of throwing an error
      }
      return doctor; // Return doctor details directly
    }



  // Endpoint to delete a doctor
  @Delete(':id')
  async deleteDoctor(@Param('id') id: number) {
    await this.doctorService.deleteDoctor(id);
    return { message: 'Doctor deleted successfully' };
  }

  // Endpoint to get all doctors
  @Get()
  async getAllDoctors() {
    return this.doctorService.getAllDoctors();
  }

  // Endpoint to get doctors by availability
  @Get('availability')
  async getDoctorsByAvailability(
    @Query('status') status: 'free' | 'busy' | 'offduty', // Restrict to allowed values
  ) {
    return this.doctorService.getDoctorsByAvailability(status);
  }
}
