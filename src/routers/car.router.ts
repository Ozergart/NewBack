import { Router } from "express";

import { carController } from "../conrollers/car.contoller";

const router = Router();

router.get("/", carController.getList);
router.post("/", carController.create);
router.get("/:carId", carController.getUser);
router.delete("/:carId", carController.deleteUser);
router.put("/:carId", carController.changeUser);

export const userRouter = router;
