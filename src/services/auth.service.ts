import {ILogin, IUser} from '../interfaces/user.interface'
import {ApiError} from '../errors/api-errors'
import {passwordService} from "./password.service";
import {tokenService} from "./token.service";
import {userRepository} from "../repositories/user.repository";
import {ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import {tokenRepository} from "../repositories/token.repository";
import {emailService} from "./email.service";
import {EmailTypeEnum} from "../enums/email-type.enum";
class AuthService {

    public async signUp (dto: IUser): Promise<{user: IUser, tokens: ITokenPair }> {
        await this.isEmailExist(dto.email);
        const password = await passwordService.hash(dto.password);

        const user = await userRepository.create({...dto, password});

        const tokens = await tokenService.generatePair({ userId: user._id,
            role: user.role,});

         await tokenRepository.create({...tokens, _userId: user._id});
         await emailService.sendEmail(EmailTypeEnum.WELCOME, dto.email, {
             name: dto.name,
             actionToken: "actionToken",
         })


        return { user, tokens }

    }
    public async signIn(dto: ILogin): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByParams({ email: dto.email });
        if (!user) {
            throw new ApiError("Invalid credentials", 401);
        }

        const isPasswordCorrect = await passwordService.comparePassword(
            dto.password,
            user.password,
        );
        if (!isPasswordCorrect) {
            throw new ApiError("Invalid credentials", 401);
        }

        const tokens = await tokenService.generatePair({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }

    public async refresh (payload: ITokenPayload, oldTokensId: string): Promise<ITokenPair> {
        const user = await userRepository.getByParams({ _id: payload.userId });
        const tokens = await tokenService.generatePair({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: payload.userId });
        await tokenRepository.deleteById(oldTokensId)
        return tokens
    }
    public async logoutAll(payload: ITokenPayload, ): Promise<void> {
        await tokenRepository.deleteByParams({_userId: payload.userId})
        const user = await userRepository.getById(payload.userId);
        await emailService.sendEmail(EmailTypeEnum.LOGOUT, user.email, {
            name: user.name,
        });

    }
    public async logout(payload: ITokenPayload, tokensId: string): Promise<void> {
        await tokenRepository.deleteById(tokensId);
        const user = await userRepository.getById(payload.userId);
        await emailService.sendEmail(EmailTypeEnum.LOGOUT, user.email, {
            name: user.name,
        });
    }

    public async forgotPassword(email: string): Promise<void> {
        const user = await userRepository.getByParams({ email });
        if(user) {
            await emailService.sendEmail(EmailTypeEnum.FORGOT_PASSWORD, email, {
                name: user.name,
                actionToken: 'actionToken'
            });
        }
    }

    private async isEmailExist(email: string): Promise<void> {
        const user = await userRepository.getByParams({email});
        if (user) {
            throw new ApiError('Email already exist', 409)
        }
    }
}
export const authService = new AuthService();