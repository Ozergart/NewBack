import { Router } from "express";

import { carController } from "../conrollers/car.contoller";
import { authMiddleware } from "../middleWares/auth.middleware";
import { commonMiddleware } from "../middleWares/common.middleware";
import { CarValidators } from "../validators/car.validators";

const router = Router();

router.get(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.checkAdminAccess,
  carController.getList,
);
router.post(
  "/",
  authMiddleware.checkAccessToken,
  authMiddleware.checkAdminAccess,
  commonMiddleware.isBodyValid(CarValidators.createCar),
  carController.create,
);
router.get(
  "/:carId",
  authMiddleware.checkAccessToken,
  authMiddleware.checkAdminAccess,
  commonMiddleware.isIdValid,
  carController.getCar,
);
router.delete(
  "/:carId",
  authMiddleware.checkAccessToken,
  authMiddleware.checkAdminAccess,
  commonMiddleware.isIdValid,
  carController.deleteCar,
);

export const carRouter = router;
