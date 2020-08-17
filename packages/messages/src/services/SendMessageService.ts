import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import roomConfig from '@config/room';
import AppError from '@errors/AppError';
import ISocketProvider from '@messages/providers/SocketProvider/models/ISocketProvider';
import Message from '../infra/typeorm/schemas/Message';
import IMessageRepository from '../repositories/IMessageRepository';

interface IRequest {
  content: string;
  room_name: string;
  sender_id: string;
}

@injectable()
export default class SendMessageService {
  constructor(
    @inject('MessageRepository') private messageRepository: IMessageRepository,

    @inject('SocketProvider') private socketProvider: ISocketProvider,
  ) {}

  public async execute({
    content,
    room_name,
    sender_id,
  }: IRequest): Promise<Message> {
    const { data: findRoom } = await axios.get<{ id: string }>(
      `/rooms/${room_name}`,
      {
        baseURL: roomConfig.url,
      },
    );

    if (!findRoom) {
      throw new AppError('You cannot send a message to an non existing room');
    }

    const message = await this.messageRepository.create({
      content,
      room_id: findRoom.id,
      sender_id,
    });

    this.socketProvider.emit(room_name, { content, sender_id });

    return message;
  }
}
