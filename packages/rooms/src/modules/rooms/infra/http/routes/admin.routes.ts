import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AdminRoomController from '../controllers/AdminRoomController';

const routes = Router();
const adminRoomController = new AdminRoomController();

routes.use(ensureAuthenticated);

routes.delete(
  '/:room_id/users/remove',
  celebrate({
    [Segments.BODY]: {
      user_ids: Joi.array().items(Joi.string()).required(),
    },
  }),
  adminRoomController.remove,
);

export default routes;
