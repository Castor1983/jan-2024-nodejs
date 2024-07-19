//import {ApiError} from '../errors/api-errors'
import {IUser} from '../interfaces/user.interface'
import {UserModel} from "../models/user.model";
class UserRepository {
    public async getList (): Promise<IUser[]> {
        return await UserModel.find();
    }
    public async create (dto: IUser): Promise<IUser> {
        return await UserModel.create(dto);

    }
    public async update (userId: string, dto: IUser): Promise<IUser> {

        return await UserModel.findByIdAndUpdate(userId, dto);

    }
    public async getById (userId: string): Promise<IUser> {
        return await UserModel.findById(userId);

}
public async deleteById (userId: string): Promise<void> {
    return await UserModel.findByIdAndDelete(userId);
}}
export const userRepository = new UserRepository();