import { NextFunction, Request, Response } from "express";

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

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = Number(req.params.userId);
      const result = await userService.getUser(userID);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = Number(req.params.userId);
      await userService.deleteUser(userID);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async changeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = Number(req.params.userId);
      const { name, email, password } = req.body;
      const user = await userService.changeUser(userID, name, email, password);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
