import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../reposetories/token.reposetory";

const handler = async () => {
  try {
    const [value, unit] = timeHelper.parseTimeString(
      configs.JWT_REFRESH_EXPIRE_IN,
    );
    const deletedCount = await tokenRepository.deleteByParamsWithReturn({
      createdAt: { $lte: timeHelper.subtractByParams(value, unit) },
    });
    console.log(`[oldTokenDeleteCron] delete ${deletedCount} tokens`);
  } catch (e) {
    console.error("[oldTokenDeleteCron] error");
  }
};
export const tokensDeleteCron = new CronJob(" */15 * * * *", handler);
