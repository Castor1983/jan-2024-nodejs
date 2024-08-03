import {userRepository} from '../repositories/user.repository'
import {IUser} from '../interfaces/user.interface'
class UserService {
    public async getList (): Promise<IUser[]> {
        return await userRepository.getList();
    }

    public async updateMe (userId: string,dto: IUser): Promise<IUser> {
        return await userRepository.updateMe(userId, dto);
    }
    public async getById(userId: string): Promise<IUser> {
return await userRepository.getById(userId);
    }
    public async deleteMe(userId: string): Promise<void> {
        return await userRepository.deleteMe(userId);
    }
}
export const userService = new UserService();