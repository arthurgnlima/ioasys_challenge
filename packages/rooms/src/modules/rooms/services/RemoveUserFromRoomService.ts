import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Room from '../infra/typeorm/entities/Room';
import IChatRoomsRepository from '../repositories/IChatRoomsRepository';

interface IRequest {
  room_id: string;
  authenticated_user_id: string;
  user_ids: string[];
}

@injectable()
export default class RemoveUserFromRoomService {
  constructor(
    @inject('ChatRoomsRepository') private roomRepository: IChatRoomsRepository,

    @inject('UserRepository') private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    authenticated_user_id,
    user_ids,
    room_id,
  }: IRequest): Promise<Room> {
    const findRoom = await this.roomRepository.findById(room_id);

    if (!findRoom) {
      throw new AppError('You can only remove an user from existing room');
    }

    if (authenticated_user_id !== findRoom.admin_id) {
      throw new AppError('Only admins can remove an user');
    }

    const users = await this.userRepository.findByIds(user_ids);

    if (!users.length) {
      throw new AppError('You can only remove an existing user');
    }

    if (user_ids.includes(findRoom.admin_id)) {
      throw new AppError('Admins cannot remove themselfs');
    }

    findRoom.users = findRoom.users.filter(user => !user_ids.includes(user.id));

    await this.roomRepository.save(findRoom);

    await this.cacheProvider.invalidate('rooms-list');

    return findRoom;
  }
}
