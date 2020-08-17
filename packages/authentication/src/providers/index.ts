import { container } from 'tsyringe';

import './MailTemplateProvider';
import './MailProvider';

import IUsersRepository from '@authentication/repositories/IUserRepository';
import UsersRepository from '@authentication/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@authentication/repositories/IUserTokensRepository';
import UserTokensRepository from '@authentication/infra/typeorm/repositories/UserTokensRepository';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
