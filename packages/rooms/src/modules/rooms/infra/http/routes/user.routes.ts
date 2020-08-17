import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import RoomJoinUserController from '../controllers/RoomJoinUserController';
import RoomLeaveUserController from '../controllers/RoomLeaveUserController';

const routes = Router();
const joinRoomController = new RoomJoinUserController();
const leaveRoomController = new RoomLeaveUserController();

routes.use(ensureAuthenticated);

routes.put(
  '/:room_id/join',
  celebrate({
    [Segments.PARAMS]: {
      room_id: Joi.string().required(),
    },
  }),
  joinRoomController.update,
);

routes.put(
  '/:room_id/leave',
  celebrate({
    [Segments.PARAMS]: {
      room_id: Joi.string().required(),
    },
  }),
  leaveRoomController.update,
);

export default routes;
