import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.params.userId;
      const result = await userService.getUser(userID);
      if (!result) {
        throw new ApiError("user not found", 404);
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.res.locals.jwtPayload._userId as string;
      const result = await userService.getUser(userID);
      if (!result) {
        throw new ApiError("user not found", 404);
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.res.locals.jwtPayload._userId as string;
      await userService.deleteUser(userID);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async changeMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.res.locals.jwtPayload._userId as string;
      const dto = req.body as Partial<IUser>;
      const user = await userService.changeUser(userID, dto);
      if (!user) {
        throw new ApiError("user not found", 404);
      }
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
