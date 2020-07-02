import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import { SECRET } from '../configs/constant';

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
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
