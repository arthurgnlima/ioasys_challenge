import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

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
