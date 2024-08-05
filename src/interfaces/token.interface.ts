import {IUser} from "./user.interface";
import {RoleEnum} from "../enums/role.enum";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum";


export interface IToken {
    _id?: string;
    accessToken: string;
    refreshToken: string;
    _userId: string | IUser
}

export interface IActionToken {
    _id?: string;
    actionToken: string;
    type: ActionTokenTypeEnum;
    _userId: string | IUser
}
export interface IForgotSendEmail extends Pick<IUser, 'email'>{}
export interface IForgotResetPassword extends Pick<IUser, 'password'>{}

export interface ITokenPayload {
    userId: string;
    role: RoleEnum;
}
export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}