import { Router } from 'express';

import messageRoutes from './message.routes';

const routes = Router();

routes.use('/rooms', messageRoutes);

export default routes;
