import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@errors/AppError';
import axios from 'axios';

const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'ioasys-challenge',
    expiresIn: '1d',
  },
};

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 403);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    axios.defaults.headers.common.Authorization = authHeader;

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 403);
  }
}
