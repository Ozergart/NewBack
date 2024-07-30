import { EmailTypeEnum } from "../enums/mail-type.enum";
import { tokenActionTypeEnum } from "../enums/tokenTypes.enum";
import { ApiError } from "../errors/api-error";
import {
  IForgotResetPassword,
  IForgotSendEmail,
} from "../interfaces/action-token.interface";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ILogin, IUser } from "../interfaces/user.interface";
import { actionTokenRepository } from "../reposetories/action-token.reposetory";
import { tokenRepository } from "../reposetories/token.reposetory";
import { userRepository } from "../reposetories/user.reposetory";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: IUser,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExist(dto.email);
    dto.password = await passwordService.hash(dto.password);

    const user = await userRepository.create(dto);
    const tokens = await tokenService.generatePair({ _userId: user._id });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    const actionToken = await tokenService.generateActionToken(
      { _userId: user._id },
      tokenActionTypeEnum.REGISTER,
    );
    await actionTokenRepository.createActionToken({
      actionToken,
      type: tokenActionTypeEnum.REGISTER,
      _userId: user._id,
    });
    await emailService.sendEmail(EmailTypeEnum.WELCOME, user.email, {
      name: dto.name,
      actionToken,
    });
    return { user, tokens };
  }
  public async refreshToken(
    payload: ITokenPayload,
    oldTokenId: string,
  ): Promise<ITokenPair> {
    const user = await userRepository.getByParams({ _id: payload._userId });
    const tokens = await tokenService.generatePair({ _userId: user._id });
    await tokenRepository.create({ ...tokens, _userId: payload._userId });
    await tokenRepository.deleteById(oldTokenId);
    return tokens;
  }
  public async signOut(
    payload: ITokenPayload,
    oldTokenId: string,
  ): Promise<void> {
    const user = await userRepository.getUser(payload._userId);
    await emailService.sendEmail(EmailTypeEnum.LEAVE, user.email, {
      name: user.name,
    });
    await tokenRepository.deleteById(oldTokenId);
  }
  public async signOutAll(payload: ITokenPayload): Promise<void> {
    const user = await userRepository.getUser(payload._userId);
    await emailService.sendEmail(EmailTypeEnum.LEAVE, user.email, {
      name: user.name,
    });
    await tokenRepository.deleteByUserId(payload._userId);
  }
  public async signIn(
    dto: ILogin,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }
    const isPassCorrect = await passwordService.comparePass(
      dto.password,
      user.password,
    );
    if (!isPassCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }
    const tokens = await tokenService.generatePair({ _userId: user._id });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
  public async forgotPassword(dto: IForgotSendEmail): Promise<void> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) return;

    const actionToken = await tokenService.generateActionToken(
      { _userId: user._id },
      tokenActionTypeEnum.FORGOT_PASSWORD,
    );
    await actionTokenRepository.createActionToken({
      actionToken,
      type: tokenActionTypeEnum.FORGOT_PASSWORD,
      _userId: user._id,
    });
    await emailService.sendEmail(EmailTypeEnum.FORGOT_PASSWORD, dto.email, {
      name: user.name,
      actionToken,
    });
  }
  public async restorePass(
    dto: IForgotResetPassword,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const newPass = await passwordService.hash(dto.password);
    await userRepository.changeUser(jwtPayload._userId, { password: newPass });

    await actionTokenRepository.deleteByParams({
      _userId: jwtPayload._userId,
      type: tokenActionTypeEnum.FORGOT_PASSWORD,
    });
  }
  public async verify(jwtPayload: ITokenPayload): Promise<void> {
    await userRepository.changeUser(jwtPayload._userId, { isVerified: true });
    await actionTokenRepository.deleteByParams({
      _userId: jwtPayload._userId,
      type: tokenActionTypeEnum.REGISTER,
    });
  }
  private async isEmailExist(email: string): Promise<void> {
    const user = await userRepository.getByParams({ email });
    if (user) {
      throw new ApiError("Email already exists", 409);
    }
  }
}

export const authService = new AuthService();
