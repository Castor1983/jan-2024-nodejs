import {IActionToken} from "../interfaces/token.interface";
import {ActionTokenModel} from "../models/action-token.model";
import {FilterQuery} from "mongoose";


class ActionTokenRepository {

    public async create (dto: IActionToken): Promise<IActionToken> {
        return await ActionTokenModel.create(dto);

    }

    public async getByActionToken (actionToken: string): Promise<IActionToken> {
        return await ActionTokenModel.findOne({actionToken})
    }
    public async deleteByParams (params: FilterQuery<IActionToken>): Promise<void> {
         await  ActionTokenModel.deleteMany(params)
    }
}

export const actionTokenRepository = new ActionTokenRepository();