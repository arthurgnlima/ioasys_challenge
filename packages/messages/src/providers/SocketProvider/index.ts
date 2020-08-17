import { container } from 'tsyringe';

import ISocketProvider from './models/ISocketProvider';

import SocketIOProvider from './implementations/SocketIOProvider';

const providers = {
  socketIO: SocketIOProvider,
};

container.registerSingleton<ISocketProvider>(
  'SocketProvider',
  providers.socketIO,
);
