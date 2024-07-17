import {NextFunction, Request, Response} from 'express'
import {userService} from '../services/user.service'
class UserController {
    public async getList (req: Request, res: Response, next: NextFunction) {
        try{
            const result = await userService.getList();
            res.json(result);
        }catch (e){
            next(e)
        }
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        try{
            const dto = req.body as any
            const result = await userService.create(dto);
            res.json(result);
        }catch (e){
            next(e)
        }
    }
    public async getById (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);
            const result = await userService.getById(userId)
            res.json(result)
        }catch (e){
            next(e)
        }
    }
    public async deleteById (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);
            await userService.deleteById(userId)
            res.sendStatus(204)
        }catch (e){
            next(e)
        }
    }
}
export const userController = new UserController()