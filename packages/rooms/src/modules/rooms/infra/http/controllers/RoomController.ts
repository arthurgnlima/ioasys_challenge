import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListRoomsService from '@modules/rooms/services/ListRoomsService';
import ShowRoomService from '@modules/rooms/services/ShowRoomService';
import CreateRoomService from '@modules/rooms/services/CreateRoomService';

export default class RoomController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listRooms = container.resolve(ListRoomsService);

    const rooms = await listRooms.execute({
      user_id,
    });

    return response.json(classToClass(rooms, { groups: ['rooms'] }));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { room_name } = request.params;

    const showRoom = container.resolve(ShowRoomService);

    const room = await showRoom.execute({
      user_id,
      room_name,
    });

    return response.json(classToClass(room, { groups: ['rooms'] }));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const admin_id = request.user.id;
    const { name } = request.body;

    const createRoom = container.resolve(CreateRoomService);

    const room = await createRoom.execute({
      admin_id,
      name,
    });

    return response.json(classToClass(room, { groups: ['rooms'] }));
  }
}
