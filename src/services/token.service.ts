import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../configs/configs";
import { tokenActionTypeEnum, tokenTypeEnum } from "../enums/tokenTypes.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public async generatePair(payload: ITokenPayload): Promise<ITokenPair> {
    const accessToken = jsonwebtoken.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRE_IN,
    });
    const refreshToken = jsonwebtoken.sign(
      payload,
      configs.JWT_REFRESH_SECRET,
      {
        expiresIn: configs.JWT_REFRESH_EXPIRE_IN,
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  public checkToken(token: string, type: tokenTypeEnum): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case tokenTypeEnum.access:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case tokenTypeEnum.refresh:
          secret = configs.JWT_REFRESH_SECRET;
          break;
        default:
          throw new ApiError("not valid token type", 401);
      }
      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 401);
    }
  }
  public async generateActionToken(
    payload: ITokenPayload,
    type: tokenActionTypeEnum,
  ): Promise<string> {
    let secret: string;
    let expiresIn: string;
    switch (type) {
      case tokenActionTypeEnum.FORGOT_PASSWORD:
        secret = configs.JWT_ACTION_FORGOT_PASSWORD_SECRET;
        expiresIn = configs.JWT_ACTION_FORGOT_PASSWORD_EXPIRE_IN;
        break;
      case tokenActionTypeEnum.REGISTER:
        secret = configs.JWT_ACTION_REGISTER_SECRET;
        expiresIn = configs.JWT_ACTION_REGISTER_EXPIRE_IN;
        break;
      default:
        throw new ApiError("Action token is not valid", 404);
    }
    return jsonwebtoken.sign(payload, secret, { expiresIn });
  }
  public checkActionToken(
    token: string,
    type: tokenActionTypeEnum,
  ): ITokenPayload {
    try {
      let secret: string;
      switch (type) {
        case tokenActionTypeEnum.FORGOT_PASSWORD:
          secret = configs.JWT_ACTION_FORGOT_PASSWORD_SECRET;
          break;
        case tokenActionTypeEnum.REGISTER:
          secret = configs.JWT_ACTION_REGISTER_SECRET;
          break;
        default:
          throw new ApiError("not valid token type", 401);
      }
      return jsonwebtoken.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 401);
    }
  }
}
export const tokenService = new TokenService();
