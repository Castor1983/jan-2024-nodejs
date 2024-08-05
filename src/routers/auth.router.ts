import {Router} from 'express';
import {authController} from '../controllers/auth.controller'
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {authMiddleware} from "../middlewares/auth.middleware";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum";

const router = Router();


router.post('/sign-up', commonMiddleware.isBodyValid(UserValidator.createUser), authController.signUp);
router.post('/sign-in',commonMiddleware.isBodyValid(UserValidator.loginUser), authController.signIn);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/logout-all', authMiddleware.checkAccessToken, authController.logoutAll);
router.post('/forgot-password', commonMiddleware.isBodyValid(UserValidator.forgotPassword), authController.forgotPassword);
router.put('/forgot-password', commonMiddleware.isBodyValid(UserValidator.forgotPasswordSet), authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),  authController.forgotPasswordSet);
router.post('/verify', authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL), authController.verifyEmail);


export const authRouter = router