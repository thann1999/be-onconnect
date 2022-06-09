import schedule from 'node-schedule';
import { UserInfo } from '../../shared/types/user.type';
import UserDao from '../../dao/user.dao';
import LeeonAPI from '../../api/leeon.api';

// Block user when user expired date free trial
export async function blockUser() {
  const cronExpress = '0 0 8 * * *';
  schedule.scheduleJob(cronExpress, async () => {
    try {
      const listUser = (await UserDao.getExpiredUser()) as UserInfo[];
      const callAPI: any[] = [];
      listUser.forEach((item) => {
        callAPI.push(() => {
          return LeeonAPI.blockUserExpiredDate(item.orgUnitId || 0);
        });
      });
      await Promise.all(callAPI.map((api) => api()));
    } catch (error) {
      console.log(error);
    }
  });
}
