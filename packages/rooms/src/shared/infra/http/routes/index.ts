import { Router } from 'express';

import roomsRouter from '@modules/rooms/infra/http/routes/room.routes';
import adminRoomRouter from '@modules/rooms/infra/http/routes/admin.routes';
import userRoomRouter from '@modules/rooms/infra/http/routes/user.routes';

const routes = Router();

routes.use('/rooms', roomsRouter, adminRoomRouter, userRoomRouter);

export default routes;
