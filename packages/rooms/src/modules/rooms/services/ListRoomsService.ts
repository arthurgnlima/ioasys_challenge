import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Room from '../infra/typeorm/entities/Room';
import IChatRoomsRepository from '../repositories/IChatRoomsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class CreateRoomService {
  constructor(
    @inject('ChatRoomsRepository') private roomRepository: IChatRoomsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Room[]> {
    const cacheKey = `rooms-list:${user_id}`;

    // let rooms = await this.cacheProvider.recover<Room[]>(cacheKey);
    let rooms;

    if (!rooms) {
      rooms = await this.roomRepository.find();

      await this.cacheProvider.save(cacheKey, classToClass(rooms));
    }

    return rooms;
  }
}
