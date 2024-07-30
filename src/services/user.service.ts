import {userRepository} from '../repositories/user.repository'
import {IUser} from '../interfaces/user.interface'
import {ApiError} from '../errors/api-errors'
class UserService {
    public async getList (): Promise<IUser[]> {
        return await userRepository.getList();
    }
    public async create (dto: IUser): Promise<IUser> {
        const { name, email, } = dto;
        if (!name ) {
            throw new ApiError(
                "Name is required and should be at least 3 characters",
                400,
            );
        }
        if (!email || !email.includes("@")) {
            throw new ApiError("Email is required and should be valid", 400);
        }
        await this.isEmailExist(email);

        return await userRepository.create(dto);
    }
    public async update (userId: string,dto: IUser): Promise<IUser> {
        return await userRepository.update(userId, dto);
    }
    public async getById(userId: string): Promise<IUser> {
return await userRepository.getById(userId);
    }
    public async deleteById(userId: string): Promise<void> {
        return await userRepository.deleteById(userId);
    }
    private async isEmailExist(email: string): Promise<void> {
        const user = await userRepository.getByParams({email});
        if (user) {
            throw new ApiError('Email already exist', 409)
        }
    }
}
export const userService = new UserService();