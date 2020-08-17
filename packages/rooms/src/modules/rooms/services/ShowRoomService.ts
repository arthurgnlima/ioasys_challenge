import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Room from '../infra/typeorm/entities/Room';
import IChatRoomsRepository from '../repositories/IChatRoomsRepository';

interface IRequest {
  user_id: string;
  room_name: string;
}

@injectable()
export default class ShowRoomService {
  constructor(
    @inject('ChatRoomsRepository') private roomRepository: IChatRoomsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, room_name }: IRequest): Promise<Room> {
    const cacheKey = `rooms-list:${user_id}:${room_name}`;

    let room = await this.cacheProvider.recover<Room>(cacheKey);

    if (!room) {
      room = await this.roomRepository.findByName(room_name);

      await this.cacheProvider.save(cacheKey, classToClass(room));
    }

    return room;
  }
}
