import UserModel from '../models/user.model';
import { UserInfo, Role } from '../shared/types/user.type';
import BaseDao from './base.dao';
import { Optional } from 'sequelize/types';
import PackageModel from '../models/package.model';
import sequelize from '../database/db-connection';
import { Op } from 'sequelize';

class UserDao extends BaseDao {
  insertUser(data: Optional<UserInfo, 'id'>) {
    return super.insertOne(UserModel, data);
  }

  getUserById(id: number) {
    return super.findByPk(UserModel, id, PackageModel);
  }

  // Get all user not include admin
  getAllUser() {
    return super.findAll({
      model: UserModel,
      where: { role: Role.USER },
      include: PackageModel,
    });
  }

  findUserByEmailAndPassword(email: string, password: string) {
    return super.findOne(UserModel, { email, password });
  }

  updateUser(where: any, value: any) {
    return super.update(UserModel, where, value);
  }

  getExpiredUser() {
    return super.findAll({
      model: UserModel,
      where: sequelize.where(
        sequelize.fn('datediff', sequelize.fn('NOW'), sequelize.col('createdAt')),
        {
          [Op.gt]: 1,
        }
      ),
    });
  }
}

const instance = new UserDao();
export default instance;
