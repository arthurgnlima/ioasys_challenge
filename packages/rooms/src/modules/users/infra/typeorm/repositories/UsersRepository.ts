import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/rooms/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/rooms/repositories/IUserRepository';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, { relations: ['rooms'] });

    return user;
  }

  public async findByIds(ids: string[]): Promise<User[]> {
    const users = await this.ormRepository.findByIds(ids, {
      relations: ['rooms'],
    });

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      relations: ['rooms'],
      where: { email },
    });

    return user;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create({ email, name, password });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
