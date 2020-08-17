import { getRepository, Repository } from 'typeorm';

import IRoomsRepository from '@modules/rooms/repositories/IChatRoomsRepository';
import ICreateRoomDTO from '@modules/rooms/dtos/ICreateRoomDTO';
import Room from '../entities/Room';

export default class RoomRepository implements IRoomsRepository {
  private ormRepository: Repository<Room>;

  constructor() {
    this.ormRepository = getRepository(Room);
  }

  public async find(): Promise<Room[]> {
    const rooms = await this.ormRepository.find({ relations: ['users'] });

    return rooms;
  }

  public async findById(id: string): Promise<Room | undefined> {
    const room = await this.ormRepository.findOne(id, { relations: ['users'] });

    return room;
  }

  public async findByName(name: string): Promise<Room | undefined> {
    const room = await this.ormRepository.findOne({
      where: { name },
      relations: ['users'],
    });

    return room;
  }

  public async create({
    admin_id,
    name,
    users,
  }: ICreateRoomDTO): Promise<Room> {
    const room = this.ormRepository.create({
      admin_id,
      name,
      users,
    });

    await this.ormRepository.save(room);

    return room;
  }

  public async save(room: Room): Promise<Room> {
    return this.ormRepository.save(room);
  }

  public async delete(room_id: string): Promise<void> {
    await this.ormRepository.delete({ id: room_id });
  }
}
