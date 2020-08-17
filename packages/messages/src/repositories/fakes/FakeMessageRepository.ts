import { ObjectID } from 'mongodb';

import IMessageRepository from '@messages/repositories/IMessageRepository';
import ICreateMessageDTO from '@messages/dtos/ICreateMessageDTO';
import Message from '@messages/infra/typeorm/schemas/Message';

export default class FakeMessageRepository implements IMessageRepository {
  private messages: Message[] = [];

  public async create({
    content,
    room_id,
    sender_id,
  }: ICreateMessageDTO): Promise<Message> {
    const message = new Message();

    Object.assign(message, {
      id: new ObjectID(),
      content,
      room_id,
      sender_id,
    });

    this.messages.push(message);

    return message;
  }
}
