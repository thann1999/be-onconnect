import { Model, ModelStatic } from 'sequelize/types';

class BaseDao {
  insertOne(model: ModelStatic<Model<any, any>>, data: any) {
    return new Promise((resolve, reject) => {
      model
        .create(data, { logging: false })
        .then((value) => resolve(value))
        .catch((err) => reject(err));
    });
  }
}

export default BaseDao;
