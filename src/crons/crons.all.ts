import { passwordDeleteCron } from "./remove-old-passwords";
import { tokensDeleteCron } from "./remove-old-tokens";
import { EmailsToUnActiveUsersCron } from "./unActive-users-cron";

export const jobRunner = () => {
  tokensDeleteCron.start();
  passwordDeleteCron.start();
  EmailsToUnActiveUsersCron.start();
};
