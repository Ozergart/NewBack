import { Router } from "express";

import { carController } from "../conrollers/car.contoller";

const router = Router();

router.get("/", carController.getList);
router.post("/", carController.create);
router.get("/:carId", carController.getCar);
router.delete("/:carId", carController.deleteCar);

export const carRouter = router;
