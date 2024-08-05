import {NextFunction, Request, Response} from 'express'
import {authService} from '../services/auth.service'
import {ILogin, IUser} from "../interfaces/user.interface";
import {ITokenPayload} from "../interfaces/token.interface";
class AuthController {

    public async signUp(req: Request, res: Response, next: NextFunction) {
        try{
            const dto = req.body as IUser
            const result = await authService.signUp(dto);
            res.status(201).json(result);
        }catch (e){
            next(e)
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ILogin;
            const result = await authService.signIn(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const oldTokensId = req.res.locals.oldTokensId as string;
            const result = await authService.refresh(jwtPayload, oldTokensId );
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async logoutAll(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

            await authService.logoutAll(jwtPayload);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const tokensId = req.res.locals.tokensId as string;
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            await authService.logout(jwtPayload, tokensId );
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.body;

            await authService.forgotPassword(jwtPayload);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

}
export const authController = new AuthController()