import {RoleEnum} from "../enums/role.enum";

export interface IUser {
    _id?: string;
    name: string,
    age: string,
    email: string,
    password: string,
    phone?: string,
    role:  RoleEnum,
    isVerified: boolean,
    createDat?: Date,
    updateDat?: Date
}
export interface ILogin extends Pick<IUser, 'email' | 'password'> {}