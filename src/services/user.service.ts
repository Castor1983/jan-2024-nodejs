import {userRepository} from '../repositories/user.repository'
import {IUser} from '../interfaces/user.interface'
import {ApiError} from '../errors/api-errors'
class UserService {
    public async getList (): Promise<IUser[]> {
        return await userRepository.getList();
    }
    public async create (dto: IUser): Promise<IUser> {
        const { name, email, age } = dto;
        if (!name || name.length < 3) {
            throw new ApiError(
                "Name is required and should be at least 3 characters",
                400,
            );
        }
        if (!email || !email.includes("@")) {
            throw new ApiError("Email is required and should be valid", 400);
        }
        if (!age || age < 0 && age > 110) {
            throw new ApiError("Age will be more then 0", 400,);
        }
        return await userRepository.create(dto);
    }
    public async update (userId: number,dto: IUser): Promise<IUser> {
        const { name, email, age } = dto;
        if (!name || name.length < 3) {
            throw new ApiError(
                "Name is required and should be at least 3 characters",
                400,
            );
        }
        if (!email || !email.includes("@")) {
            throw new ApiError("Email is required and should be valid", 400);
        }
        if (!age || age < 0 && age > 110) {
            throw new ApiError("Age will be more then 0", 400,);
        }
        return await userRepository.update(userId, dto);
    }
    public async getById(userId: number): Promise<IUser> {
return await userRepository.getById(userId);
    }
    public async deleteById(userId: number): Promise<void> {
        return await userRepository.deleteById(userId);
    }
}
export const userService = new UserService();