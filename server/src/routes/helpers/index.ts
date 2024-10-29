import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { User } from '../../models/index.js';

const {sign, verify} = jsonwebtoken

export function verifyToken(token: string) {
  try {
    const data = verify(token, 'some secret');

    return data;
  } catch (error) {
    console.log('verify token error', error);
    return false;
  }
}

export function createToken(user_id: number) {
  const token = sign({ user_id }, 'some secret');

  return token;
}

export const isAuthenticated: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req?.cookies?.token;

  if (!token) {
    res.status(401).json({
      message: 'You are not authorized to perform that action'
    });
    return;
  }

  const tokenData = verifyToken(token);

  if (tokenData && typeof tokenData !== 'string') {
    const { user_id } = tokenData as { user_id: number };
    const user = await User.findByPk(user_id);
    req.user = user;

    next();
  } else {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
};