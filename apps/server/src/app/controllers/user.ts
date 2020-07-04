import { Response, Request } from 'express';
import User, { UserSchema } from '../models/user';
import BadRequestException from '../exceptions/BadRequestException';
import ServerException from '../exceptions/ServerException';

interface AuthRequest extends Request {
  user: UserSchema;
  token: string;
}

class UserController {
  async signUp(req, res, next) {
    try {
      const user = new User(req.body);
      const token = await user.generateAuthToken();
      await user.save();
      res.status(201).send({ user, token });
    } catch (e) {
      next(new BadRequestException('Bad auth request', e));
    }
  }

  async login(req, res, next) {
    try {
      const user = await User.findByCredentials(
        req.body.username,
        req.body.password
      );

      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      next(new BadRequestException('Bad auth request', e));
    }
  }

  async logout(req: AuthRequest, res: Response, next) {
    try {
      req.user.tokens = req.user.tokens.filter((el: any) => {
        return el.token !== req.token;
      });
      await req.user.save();

      res.send();
    } catch (e) {
      next(new ServerException(e));
    }
  }

  async getAllUsers(req: Request, res: Response, next) {
    try {
      const users = await User.find();

      res.send(users);
    } catch (e) {
      next(new ServerException(e));
    }
  }
}

export default UserController;
