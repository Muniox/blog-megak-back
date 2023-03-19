// middleware autoryzacji dla użytkownika i admina
import { promisify } from 'util';
import config from '../global/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UsersEntity } from '../types';
import { ValidationExpressError } from './errors';

export interface MyJwtPayload extends jwt.JwtPayload {
  id: UsersEntity['id'];
  role: 'admin' | 'user';
}

export interface AuthorizeRequest extends Request{
  userInfo: MyJwtPayload
}

const authorize = async (myToken: string) => {
  function verifyAsync(
    token: string,
    secretOrPrivateKey: jwt.Secret,
  ): Promise<MyJwtPayload> {
    const verify = promisify(jwt.verify.bind(jwt));
    return verify(token, secretOrPrivateKey) as Promise<MyJwtPayload>;
  }

  try {
    return await verifyAsync(myToken, config.SECRET);
  } catch (err) {
    throw new ValidationExpressError('token nie jest poprawny!', 403);
  }
};

export const authorizeUser = async (req: AuthorizeRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  req.userInfo = await authorize(token);

  if (req.userInfo.role === 'user' || req.userInfo.role === 'admin') { // dodajemy warunek dla admina
    next();
  } else {
    throw new ValidationExpressError('Dostęp tylko dla użytkownika.', 401);
  }
};

// middleware autoryzacji tylko dla administratora
export const authorizeAdmin = async (req: AuthorizeRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  req.userInfo = await authorize(token);

  if (req.userInfo.role === 'admin') {
    next();
  } else {
    throw new ValidationExpressError('Dostęp tylko dla administratora.', 401);
  }
};
