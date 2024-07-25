import * as jsonwebtoken from "jsonwebtoken";

import { configs } from "../configs/configs";
import { tokenTypeEnum } from "../enums/tokenTypes.enum";
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
}
export const tokenService = new TokenService();
