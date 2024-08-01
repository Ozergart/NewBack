import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { EmailTypeEnum } from "../enums/mail-type.enum";
import { timeHelper } from "../helpers/time.helper";
import { userRepository } from "../reposetories/user.reposetory";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    const [value, unit] = timeHelper.parseTimeString(
      configs.NO_ACTIVITY_TIME_TO_SEND_EMAIL,
    );
    const users = await userRepository.getByParams({
      lastActivity: { $lte: timeHelper.subtractByParams(value, unit) },
    });
    users.map((user) => {
      emailService.sendEmail(EmailTypeEnum.OLD_VISIT, user.email, {
        name: user.name,
      });
      console.log(`[EmailCron]send email to ${user.email}`);
    });
  } catch (e) {
    console.log("[EmailCron] error");
  }
};
export const EmailsToUnActiveUsersCron = new CronJob("0 10 * * *", handler);
// export const EmailsToUnActiveUsersCron = new CronJob("*/5 * * * * *", handler);
