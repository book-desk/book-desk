import { Response, Request } from 'express';
import User, { IUserSchema } from '../models/user';

interface IAuthRequest extends Request {
  user: IUserSchema;
  token: string;
}

class UserController {
  async signUp(req, res) {
    try {
      const user = new User(req.body);
      const token = await user.generateAuthToken();
      user.save();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async login(req, res) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async logout(req: IAuthRequest, res: Response) {
    try {
      req.user.tokens = req.user.tokens.filter((el: any) => {
        return el.token !== req.token;
      });
      await req.user.save();

      res.send();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.find();

      res.send(users);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default UserController;
