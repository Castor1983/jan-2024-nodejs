import {RoleEnum} from "../enums/role.enum";

export interface IUser {
    _id?: string;
    name: number,
    age: string,
    email: string,
    password: string,
    phone?: string,
    role:  RoleEnum,
    isVerified: boolean,
    createDat?: Date,
    updateDat?: Date
}