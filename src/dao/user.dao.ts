import UserModel from '../models/user.models';
import { UserInfo } from 'shared/types/user.type';
import BaseDao from './base.dao';

class UserDao extends BaseDao {
  insertUser(data: UserInfo) {
    super.insertOne(UserModel, data);
  }
}

const instance = new UserDao();
export default instance;
