// src/models/article.ts
import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Article extends Model {
  public title?: string;
  public content?: string;
  public image?: string;
  public tags?: string[]; 
}

export const ArticleMap = (sequelize: Sequelize) => {
    Article.init(
      {
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        tags: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'articles',
        timestamps: false, 
      }
    );
  
    Article.sync();
  };
  