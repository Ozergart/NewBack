import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helpers/time.helper";
import { passwordRepository } from "../reposetories/password.repository";

const handler = async () => {
  try {
    const [value, unit] = timeHelper.parseTimeString(
      configs.OLD_PASSWORDS_SAVE_TIME,
    );
    const deletedCount = await passwordRepository.deleteByParamsWithReturn({
      createdAt: { $lte: timeHelper.subtractByParams(value, unit) },
    });
    console.log(`[passwordDeleteCron] delete ${deletedCount} passwords`);
  } catch (e) {
    console.log("[passwordDeleteCron] error");
  }
};

export const passwordDeleteCron = new CronJob("  */15 * * * *", handler);
