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
}
