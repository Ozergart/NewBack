import { Router } from "express";

import { userController } from "../conrollers/user.contoller";
import { authMiddleware } from "../middleWares/auth.middleware";
import { commonMiddleware } from "../middleWares/common.middleware";
import { UserValidator } from "../validators/user.validators";

const router = Router();

router.get("/", userController.getList);
router.get(
  "/me",
  authMiddleware.checkAccessToken,
  authMiddleware.checkVerified,
  userController.getMe,
);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUser,
);
router.put(
  "/me",
  authMiddleware.checkAccessToken,
  authMiddleware.checkVerified,
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userController.changeMe,
);
router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

export const userRouter = router;
