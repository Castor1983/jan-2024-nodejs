import {RoleEnum} from "../enums/role.enum";

export interface IUser {
    id?: string;
    name: number,
    age: string,
    email: string,
    password: string,
    phone?: string,
    role:  RoleEnum,
    isVerified: boolean
}