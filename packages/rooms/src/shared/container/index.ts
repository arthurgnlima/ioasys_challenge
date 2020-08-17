import { container } from 'tsyringe';

import './providers';

import IChatRoomsRepository from '@modules/rooms/repositories/IChatRoomsRepository';
import RoomRepository from '@modules/rooms/infra/typeorm/repositories/RoomRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IChatRoomsRepository>(
  'ChatRoomsRepository',
  RoomRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UsersRepository);
