import dayjs, { ManipulateType } from "dayjs";

class TimeHelper {
  public subtractByParams(value: number, unit: ManipulateType): Date {
    return dayjs().subtract(value, unit).toDate();
  }
  public parseTimeString(string: string): [number, ManipulateType] {
    const [unit, value] = string.split(" ");
    return [parseInt(unit), value as ManipulateType];
  }
}
export const timeHelper = new TimeHelper();
