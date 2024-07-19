import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import {RoleEnum} from "../enums/role.enum";
import {IUser} from "../interfaces/user.interface";

const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: false},
    role: { type: String,  enum: RoleEnum, required: true, default: RoleEnum.USER},
    isVerified: {type: Boolean, required: true, default: false}
}, {
    timestamps: true,
    versionKey: false
})

export const UserModel = mongoose.model <IUser>('users', userSchema);