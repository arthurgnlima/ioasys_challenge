import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@authentication/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not existis');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User token does not existis');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
