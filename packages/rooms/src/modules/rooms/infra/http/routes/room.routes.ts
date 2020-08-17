import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import RoomController from '../controllers/RoomController';

const routes = Router();
const roomController = new RoomController();

routes.use(ensureAuthenticated);

routes.get('/', roomController.index);

routes.get(
  '/:room_name',
  celebrate({
    [Segments.PARAMS]: {
      room_name: Joi.string().required(),
    },
  }),
  roomController.show,
);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  roomController.create,
);

export default routes;
