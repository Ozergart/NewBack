import { NextFunction, Request, Response } from "express";

import { ICar } from "../interfaces/car.interface";
import { carService } from "../services/car.service";

class CarController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await carService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ICar;
      const result = await carService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
