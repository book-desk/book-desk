import * as express from 'express';
import auth from '../middleware/auth';
import UserController from '../controllers/user';
const router = express.Router();
const user = new UserController();

//creating users by admin
router
  .post('/api/users/sign-up', user.signUp)
  .post('/api/users/login', user.login)
  .post('/api/users/logout', auth, user.logout)
  .get('/api/users', auth, user.getAllUsers);

export default router;
