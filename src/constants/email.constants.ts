import { EmailTypeEnum } from "../enums/mail-type.enum";

export const emailConstant = {
  [EmailTypeEnum.WELCOME]: {
    subject: "Welcome",
    template: "welcome",
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: "Forgot password",
    template: "forgot-password",
  },
  [EmailTypeEnum.LEAVE]: {
    subject: "Leave",
    template: "leave",
  },
  [EmailTypeEnum.OLD_VISIT]: {
    subject: "Old visit",
    template: "old-visit",
  },
};
