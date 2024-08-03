import {Router} from 'express';
import {authController} from '../controllers/auth.controller'
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();


router.post('/sign-up', commonMiddleware.isBodyValid(UserValidator.createUser), authController.signUp);
router.post('/sign-in',commonMiddleware.isBodyValid(UserValidator.loginUser), authController.signIn);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router