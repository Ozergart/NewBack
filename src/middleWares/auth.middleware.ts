import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enum";
import { tokenActionTypeEnum, tokenTypeEnum } from "../enums/tokenTypes.enum";
import { ApiError } from "../errors/api-error";
import { actionTokenRepository } from "../reposetories/action-token.reposetory";
import { tokenRepository } from "../reposetories/token.reposetory";
import { userRepository } from "../reposetories/user.reposetory";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("no token", 401);
      }
      const accessToken = header.split("Bearer ")[1];
      const payload = tokenService.checkToken(
        accessToken,
        tokenTypeEnum.access,
      );

      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }
      await userRepository.updateLastActivityById(payload._userId);
      req.res.locals.jwtPayload = payload;
      req.res.locals.oldTokens_Id = pair._id;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("no token", 401);
      }
      const refreshToken = header.split("Bearer ")[1];
      const payload = tokenService.checkToken(
        refreshToken,
        tokenTypeEnum.refresh,
      );

      const pair = await tokenRepository.findByParams({
        refreshToken: refreshToken,
      });
      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }
      await userRepository.updateLastActivityById(payload._userId);
      req.res.locals.jwtPayload = payload;
      req.res.locals.oldTokens_Id = pair._id;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkAdminAccess(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.res.locals.jwtPayload._userId;
      const user = await userRepository.getOneByParams({ _id: userId });
      if (user.role !== RoleEnum.ADMIN) {
        throw new ApiError("Access Forbidden", 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkVerified(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.jwtPayload._userId;
      const user = await userRepository.getOneByParams({ _id: userId });
      if (user.isVerified === false) {
        throw new ApiError("Account Not Verified", 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public checkActionToken(type: tokenActionTypeEnum) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization;
        if (!token) {
          throw new ApiError("no token", 401);
        }
        const payload = tokenService.checkActionToken(token, type);

        const entity = await actionTokenRepository.findByActionToken(token);
        if (!entity) {
          throw new ApiError("Token is not valid", 401);
        }

        req.res.locals.jwtPayload = payload;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
