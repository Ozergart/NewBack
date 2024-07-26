import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { ILogin, IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthContoller {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ILogin;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const oldTokensId = req.res.locals.oldTokens_Id as string;
      const result = await authService.refreshToken(jwtPayload, oldTokensId);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async signOut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const TokensId = req.res.locals.oldTokens_Id as string;
      await authService.signOut(jwtPayload, TokensId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async signOutAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      await authService.signOutAll(jwtPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthContoller();
