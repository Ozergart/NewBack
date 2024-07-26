import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enum";
import { tokenTypeEnum } from "../enums/tokenTypes.enum";
import { ApiError } from "../errors/api-error";
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
      const user = await userRepository.getByParams({ _id: userId });
      if (user.role !== RoleEnum.ADMIN) {
        throw new ApiError("Access Forbidden", 403);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
