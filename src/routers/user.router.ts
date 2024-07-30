import {Router} from 'express';
import {userController} from '../controllers/user.controller'
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.get('/', userController.getList);
router.post('/', commonMiddleware.isBodyValid(UserValidator.createUser), userController.create);
router.put('/:userId', commonMiddleware.isBodyValid(UserValidator.updateUser), commonMiddleware.isIdValid('userId'), userController.update);
router.get('/:userId', commonMiddleware.isIdValid('userId'), userController.getById);
router.delete('/:userId', commonMiddleware.isIdValid('userId'), userController.deleteById)


export const userRouter = router