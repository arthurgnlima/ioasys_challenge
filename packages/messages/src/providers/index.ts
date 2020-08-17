import { container } from 'tsyringe';

import './SocketProvider';

import IMessageRepository from '@messages/repositories/IMessageRepository';
import MessageRepository from '@messages/infra/typeorm/repositories/MessageRepository';

container.registerSingleton<IMessageRepository>(
  'MessageRepository',
  MessageRepository,
);
