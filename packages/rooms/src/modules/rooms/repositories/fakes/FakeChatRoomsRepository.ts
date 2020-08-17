import { uuid } from 'uuidv4';

import Room from '@modules/rooms/infra/typeorm/entities/Room';
import ICreateRoomDTO from '@modules/rooms/dtos/ICreateRoomDTO';
import IChatRoomsRepository from '../IChatRoomsRepository';

export default class FakeChatRoomsRepository implements IChatRoomsRepository {
  private rooms: Room[] = [];

  public async find(): Promise<Room[]> {
    return this.rooms;
  }

  public async findById(id: string): Promise<Room | undefined> {
    const findRoom = this.rooms.find(room => room.id === id);

    return findRoom;
  }

  public async findByName(name: string): Promise<Room | undefined> {
    const findRoom = this.rooms.find(room => room.name === name);

    return findRoom;
  }

  public async create(roomData: ICreateRoomDTO): Promise<Room> {
    const room = new Room();

    Object.assign(room, { id: uuid() }, roomData);

    this.rooms.push(room);

    return room;
  }

  public async save(room: Room): Promise<Room> {
    const findIndex = this.rooms.findIndex(findRoom => findRoom.id === room.id);

    this.rooms[findIndex] = room;

    return room;
  }

  public async delete(author_id: string): Promise<void> {
    const findIndex = this.rooms.findIndex(
      findRoom => findRoom.id === author_id,
    );

    this.rooms.splice(findIndex, 1);
  }
}
