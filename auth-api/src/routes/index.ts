import express from 'express';
import {
  LoginController,
  RegisterController,
  ProfileController,
} from '../controllers';
import { validateLogin, validateRegister } from '../middlewares';

const loginController = new LoginController();
const profileController = new ProfileController();
const userController = new RegisterController();

const router = express.Router();

router.post('/login', validateLogin, loginController.login);

router.get('/profile/:id', profileController.getProfile);
router.put('/profile/:id', profileController.updateProfile);
router.delete('/profile/:id', profileController.deleteProfile);

router.post('/register', validateRegister, userController.register);

export default router;
