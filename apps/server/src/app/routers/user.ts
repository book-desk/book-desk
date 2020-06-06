import * as express from 'express';
import auth from '../middleware/auth';
import UserController from '../controllers/user';
const router = express.Router();
const user = new UserController();

//creating users by admin
router
  .post('/users/sign-up', user.signUp)
  .post('/users/login', user.login)
  .post('/users/logout', auth, user.logout)
  .get('/users', auth, user.getAllUsers);

export default router;
