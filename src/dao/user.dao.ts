import UserModel from '../models/user.model';
import { UserInfo } from '../shared/types/user.type';
import BaseDao from './base.dao';
import { Optional } from 'sequelize/types';
import PackageModel from '../models/package.model';

class UserDao extends BaseDao {
  insertUser(data: Optional<UserInfo, 'id'>) {
    return super.insertOne(UserModel, data);
  }

  getUserById(id: number) {
    return super.findByPk(UserModel, id, PackageModel);
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
