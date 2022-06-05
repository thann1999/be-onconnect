import UserModel from '../models/user.model';
import { UserInfo } from '../shared/types/user.type';
import BaseDao from './base.dao';
import { Optional } from 'sequelize/types';

class UserDao extends BaseDao {
  insertUser(data: Optional<UserInfo, 'id'>) {
    return super.insertOne(UserModel, data);
  }

  findUserByEmailAndPassword(email: string, password: string) {
    return super.findOne(UserModel, { email, password });
  }

  updateUser(where: any, value: any) {
    return super.update(UserModel, where, value);
  }
}

const instance = new UserDao();
export default instance;
