import {IToken} from "../interfaces/token.interface";
import {TokenModel} from "../models/token.model";
import {FilterQuery} from "mongoose";

class TokenRepository {
    public async findByParams (params: FilterQuery<IToken>): Promise<IToken> {
        return await TokenModel.findOne(params)
    }

    public async create (dto: IToken): Promise<IToken> {
        return await TokenModel.create(dto);

    }
    public async deleteById (oldTokensId: string): Promise<void> {
        return await  TokenModel.findByIdAndDelete(oldTokensId)
    }

}

export const tokenRepository = new TokenRepository();