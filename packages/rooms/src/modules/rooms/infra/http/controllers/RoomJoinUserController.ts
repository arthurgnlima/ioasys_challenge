import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import JoinRoomService from '@modules/rooms/services/JoinRoomService';

export default class RoomJoinUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { room_id } = request.params;

    const joinRoom = container.resolve(JoinRoomService);

    const room = await joinRoom.execute({
      user_id,
      room_id,
    });

    return response.json(classToClass(room, { groups: ['rooms'] }));
  }
}
