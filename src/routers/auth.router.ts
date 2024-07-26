import { Router } from "express";

import { authController } from "../conrollers/auth.contoller";
import { authMiddleware } from "../middleWares/auth.middleware";
import { commonMiddleware } from "../middleWares/common.middleware";
import { UserValidator } from "../validators/user.validators";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  authController.signUp,
);
router.delete(
  "/sign-out",
  authMiddleware.checkAccessToken,
  authController.signOut,
);
router.delete(
  "/all-logout",
  authMiddleware.checkAccessToken,
  authController.signOutAll,
);
router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(UserValidator.signIn),
  authController.signIn,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refreshToken,
);

export const authRouter = router;
