import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('rooms')
export default class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  admin_id: string;

  @ManyToMany(() => User, user => user.rooms)
  @JoinTable({
    name: 'room_users',
    joinColumn: { name: 'room_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];

  @Expose({ groups: ['rooms'] })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ groups: ['rooms'] })
  @UpdateDateColumn()
  updated_at: Date;
}
