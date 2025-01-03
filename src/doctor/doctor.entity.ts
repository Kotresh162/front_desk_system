import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  course: string;

  @Column()
  specialization: string;

  @Column('float')
  ratings: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  location: string; // New column for location

  @Column({
    type: 'enum',
    enum: ['free', 'busy', 'offduty'], // Define allowed values
    default: 'free', // Default value
  })
  availability: 'free' | 'busy' | 'offduty'; // TypeScript enum-like typing
}
