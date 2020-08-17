import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Room from '../infra/typeorm/entities/Room';
import IChatRoomsRepository from '../repositories/IChatRoomsRepository';

interface IRequest {
  user_id: string;
  room_id: string;
}

@injectable()
export default class LeaveRoomService {
  constructor(
    @inject('ChatRoomsRepository') private roomRepository: IChatRoomsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, room_id }: IRequest): Promise<Room> {
    const room = await this.roomRepository.findById(room_id);

    if (!room) {
      throw new AppError('You can only leave an existing room', 400);
    }

    if (user_id === room.admin_id) {
      throw new AppError('Admins cannot leave the room', 400);
    }

    const roomUsersIds = room.users.map(user => user.id);

    if (!roomUsersIds.includes(user_id)) {
      throw new AppError('You cannot leave a room that you are not in', 400);
    }

    const users = room.users.filter(user => user.id !== user_id);

    room.users = users;

    await this.roomRepository.save(room);

    await this.cacheProvider.invalidatePrefix('rooms-list');

    return room;
  }
}
