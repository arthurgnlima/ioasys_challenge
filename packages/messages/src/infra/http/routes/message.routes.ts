import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@messages/infra/http/middlewares/ensureAuthenticated';
import MessageController from '../controllers/MessageController';

const routes = Router();
const messageController = new MessageController();

routes.use(ensureAuthenticated);

routes.post(
  '/:room_name/send-message',
  celebrate({
    [Segments.BODY]: { content: Joi.string().required() },
    [Segments.PARAMS]: { room_name: Joi.string().required() },
  }),
  messageController.create,
);

export default routes;
