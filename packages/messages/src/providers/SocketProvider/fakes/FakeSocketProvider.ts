import ISocketProvider from '../models/ISocketProvider';

interface ISocketData {
  [key: string]: string;
}

export default class FakeSocketProvider implements ISocketProvider {
  private socket: ISocketData = {};

  public async emit(key: string, value: any): Promise<void> {
    this.socket[key] = JSON.stringify(value);
  }
}
