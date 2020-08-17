import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import LeaveRoomService from '@modules/rooms/services/LeaveRoomService';

export default class RoomLeaveUserController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { room_id } = request.params;

    const leaveRoom = container.resolve(LeaveRoomService);

    const room = await leaveRoom.execute({
      user_id,
      room_id,
    });

    return response.json(classToClass(room, { groups: ['rooms'] }));
  }
}
