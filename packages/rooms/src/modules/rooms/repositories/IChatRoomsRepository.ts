import Room from '../infra/typeorm/entities/Room';
import ICreateRoomDTO from '../dtos/ICreateRoomDTO';

export default interface IChatRoomsRepository {
  find(): Promise<Room[]>;
  findById(id: string): Promise<Room | undefined>;
  findByName(name: string): Promise<Room | undefined>;
  create(data: ICreateRoomDTO): Promise<Room>;
  save(room: Room): Promise<Room>;
  delete(room_id: string): Promise<void>;
}
