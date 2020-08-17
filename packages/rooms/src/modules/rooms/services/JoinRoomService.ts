import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Room from '../infra/typeorm/entities/Room';
import IChatRoomsRepository from '../repositories/IChatRoomsRepository';

interface IRequest {
  user_id: string;
  room_id: string;
}

@injectable()
export default class JoinRoomService {
  constructor(
    @inject('ChatRoomsRepository') private roomRepository: IChatRoomsRepository,

    @inject('UserRepository') private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id, room_id }: IRequest): Promise<Room> {
    const room = await this.roomRepository.findById(room_id);

    if (!room) {
      throw new AppError('You can only join to an existing room');
    }

    const roomUsersIds = room.users.map(user => user.id);

    if (roomUsersIds.includes(user_id)) {
      throw new AppError('You cannot join a room that you already in');
    }

    const user = await this.userRepository.findById(user_id);

    room.users.push(user);

    await this.roomRepository.save(room);

    await this.cacheProvider.invalidatePrefix('rooms-list');

    return room;
  }
}
