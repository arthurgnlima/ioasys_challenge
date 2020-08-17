import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SendMessageService from '@messages/services/SendMessageService';

export default class MessageController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { content } = request.body;
    const { room_name } = request.params;

    const sendMessage = container.resolve(SendMessageService);

    const message = await sendMessage.execute({
      content,
      room_name,
      sender_id: request.user.id,
    });

    return response.json(classToClass(message));
  }
}
