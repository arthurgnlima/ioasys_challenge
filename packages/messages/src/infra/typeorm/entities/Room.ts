import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('rooms')
export default class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  admin_id: string;

  @Expose()
  @CreateDateColumn()
  created_at: Date;

  @Expose()
  @UpdateDateColumn()
  updated_at: Date;
}
