import { Controller, Post, Put, Delete, Get, Body, Param } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // Endpoint to add a new doctor
  @Post()
  async addDoctor(
    @Body() body: { name: string; course: string; specialization: string; ratings: number; description: string },
  ) {
    return this.doctorService.addDoctor(body.name, body.course, body.specialization, body.ratings, body.description);
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
    }>,
  ) {
    return this.doctorService.updateDoctor(id, body);
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
}
