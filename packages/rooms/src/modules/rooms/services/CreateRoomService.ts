import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Room from '../infra/typeorm/entities/Room';
import IChatRoomsRepository from '../repositories/IChatRoomsRepository';

interface IRequest {
  name: string;
  admin_id: string;
}

@injectable()
export default class CreateRoomService {
  constructor(
    @inject('ChatRoomsRepository') private roomRepository: IChatRoomsRepository,

    @inject('UserRepository') private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ admin_id, name }: IRequest): Promise<Room> {
    const findRoom = await this.roomRepository.findByName(name);

    if (findRoom) {
      throw new AppError('Room name already exists');
    }

    const user = await this.userRepository.findById(admin_id);

    const room = await this.roomRepository.create({
      admin_id,
      name,
      users: [user],
    });

    await this.cacheProvider.invalidatePrefix('rooms-list');

    return room;
  }
}
