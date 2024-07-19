import {NextFunction, Request, Response} from "express";
import {isObjectIdOrHexString} from 'mongoose'
import {ApiError} from "../errors/api-errors";
class CommonMiddleware {
    public isIdValid(paramName: string) {

        return (req: Request, res: Response, next: NextFunction) =>
        {
            try {
                const _id = req.params[paramName]
                if (!isObjectIdOrHexString(_id)) {
                    throw new ApiError('Invalid id', 400);
                }
                next();
            } catch (e) {
                next(e)
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware()