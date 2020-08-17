import { getMongoRepository, MongoRepository } from 'typeorm';

import IMessageRepository from '@messages/repositories/IMessageRepository';
import ICreateMessageDTO from '@messages/dtos/ICreateMessageDTO';

import Notification from '../schemas/Message';

class NotificationsRepository implements IMessageRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    room_id,
    sender_id,
  }: ICreateMessageDTO): Promise<Notification> {
    const message = this.ormRepository.create({
      content,
      room_id,
      sender_id,
    });

    await this.ormRepository.save(message);

    return message;
  }
}

export default NotificationsRepository;
