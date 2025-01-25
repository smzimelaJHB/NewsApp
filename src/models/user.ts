// src/models/user.ts
import { Model, Sequelize, DataTypes } from 'sequelize';
export default class User extends Model {
  public username ?: string;
  public name ?: string;
  public password ?: string;
  public salt ?: string;
}
export const UserMap = (sequelize: Sequelize) => {
  User.init({
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false
  });
  User.sync();
}