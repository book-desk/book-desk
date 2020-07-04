import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import { SECRET } from '../configs/constant';
import UnauthorizedException from '../exceptions/UnauthorizedException';

interface JWT extends Object {
  id: string;
  tokens: Array<string>;
}

export default async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, SECRET) as JWT;

    const user = await User.findOne({
      _id: decoded.id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    next(new UnauthorizedException());
  }
};
