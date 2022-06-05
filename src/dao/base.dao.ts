import {
  Attributes,
  FindAttributeOptions,
  FindOptions,
  Model,
  ModelStatic,
  Optional,
  WhereOptions,
} from 'sequelize/types';

class BaseDao {
  insertOne(model: ModelStatic<Model<any, any>>, data: Optional<any, string>) {
    return new Promise((resolve, reject) => {
      model
        .create(data, { logging: false })
        .then((value) => resolve(value))
        .catch((err) => reject(err));
    });
  }

  insertMany(model: ModelStatic<Model<any, any>>, data: Optional<any, string>[]) {
    return new Promise((resolve, reject) => {
      model
        .bulkCreate(data, { logging: false })
        .then((value) => resolve(value))
        .catch((err) => reject(err));
    });
  }

  findOne(
    model: ModelStatic<Model<any, any>>,
    where: WhereOptions,
    attributes?: FindAttributeOptions
  ) {
    return new Promise((resolve, reject) => {
      const option: FindOptions = {
        where,
        logging: false,
      };
      if (attributes) option.attributes = attributes;
      model
        .findOne(option)
        .then((value) => resolve(value))
        .catch((err) => reject(err));
    });
  }

  findAll(
    model: ModelStatic<Model<any, any>>,
    where?: WhereOptions,
    attributes?: FindAttributeOptions
  ) {
    return new Promise((resolve, reject) => {
      const option: FindOptions = { logging: false };
      if (where) option.where = where;
      if (attributes) option.attributes = attributes;
      model
        .findAll(option)
        .then((value) => resolve(value))
        .catch((err) => reject(err));
    });
  }

  update(model: ModelStatic<Model<any, any>>, where: any, values: Attributes<any>) {
    return new Promise((resolve, reject) => {
      model
        .update(values, {
          where,
          logging: false,
        })
        .then((value) => resolve(value))
        .catch((err) => reject(err));
    });
  }
}

export default BaseDao;
