import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import { secret } from '../configs/constant';

interface IJWT extends Object {
  id: string;
  tokens: Array<string>;
}

export default async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secret) as IJWT;
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
