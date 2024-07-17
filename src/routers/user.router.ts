import { Router } from "express";

import { userController } from "../conrollers/user.contoller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);
router.get("/:userId", userController.getUser);
router.delete("/:userId", userController.deleteUser);
router.put("/:userId", userController.changeUser);

export const userRouter = router;
