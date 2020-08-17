import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import RemoveUserFromRoomService from '@modules/rooms/services/RemoveUserFromRoomService';

export default class AdminRoomController {
  public async remove(request: Request, response: Response): Promise<Response> {
    const { user_ids, room_id } = request.body;

    const removeUserFromRoom = container.resolve(RemoveUserFromRoomService);

    const room = await removeUserFromRoom.execute({
      authenticated_user_id: request.user.id,
      user_ids,
      room_id,
    });

    return response.json(classToClass(room, { groups: ['rooms'] }));
  }
}
