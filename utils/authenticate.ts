import { promisify } from 'util';
import config from '../global/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { FieldPacket } from 'mysql2';
import { NextFunction, Request, Response } from 'express';
import { pool } from './database';
import { ValidationExpressError } from './errors';
import { SimpleEntity, UsersEntity } from '../types';

type UsersRecordResults = [
    UsersEntity[],
    FieldPacket[],
]

export interface AuthenticatedRequest extends Request{
  data: SimpleEntity
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  // Check user
  const [results] = await pool.execute('SELECT * FROM `users` WHERE `name` = :name', {
    name: req.body.name,
  }) as UsersRecordResults;

  if (results.length === 0) throw new ValidationExpressError('Nie znaleziono Użytkownika!', 404);

  // Check Password
  const isPasswordCorrect = await bcrypt.compare(req.body.password, results[0].password);
  if (!isPasswordCorrect) throw new ValidationExpressError('Hasło jest niepoprawne!', 400);

  function signAsync(
    payload: string | Buffer | object,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions,
  ): Promise<string> {
    const sign = promisify(jwt.sign.bind(jwt));
    return sign(payload, secretOrPrivateKey, options) as Promise<string>;
  }

  const token = await signAsync({
    id: results[0].id,
    role: results[0].role,
  }, config.SECRET, { expiresIn: '24h' });

  const { password, ...data } = results[0];
  res.cookie('access_token', token, {
    httpOnly: true, maxAge: 24 * 60 * 60 * 1000,
  });
  req.data = data;
  next();
};
