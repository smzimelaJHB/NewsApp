import { db_url } from '../config';
import { Sequelize } from 'sequelize';


export default new Sequelize(db_url,{
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false, 
});