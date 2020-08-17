import SocketIO, { Server } from 'socket.io';

import ISocketProvider from '../models/ISocketProvider';

export default class SocketIOProvider implements ISocketProvider {
  private client: Server;

  constructor() {
    this.client = new SocketIO();
  }

  public async emit(key: string, value: any): Promise<void> {
    this.client.emit(key, value);
  }
}
