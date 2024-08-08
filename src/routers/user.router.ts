import { Router } from "express";

import { userController } from "../conrollers/user.contoller";
import { avatarConfig } from "../constants/image.constants";
import { authMiddleware } from "../middleWares/auth.middleware";
import { commonMiddleware } from "../middleWares/common.middleware";
import { fileMiddleware } from "../middleWares/file.middleware";
import { UserValidator } from "../validators/user.validators";

const router = Router();

router.get(
  "/",
  commonMiddleware.isQueryValid(UserValidator.listQuery),
  userController.getList,
);
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
router.post(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isFileValid("avatar", avatarConfig),
  userController.uploadAvatar,
);
router.delete(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  userController.deleteAvatar,
);

export const userRouter = router;
