import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import Room from '@modules/rooms/infra/typeorm/entities/Room';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @ManyToMany(() => Room, room => room.users)
  rooms: Room[];

  @Column()
  @Exclude()
  password: string;

  @Expose({ groups: ['users'] })
  @CreateDateColumn()
  created_at: Date;

  @Expose({ groups: ['users'] })
  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
