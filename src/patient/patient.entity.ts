// src/patient/patient.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  disease: string;

  @Column()
  specializedDoctor: string;

  @Column()
  arrivalTime: string;
}
