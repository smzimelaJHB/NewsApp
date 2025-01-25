// src/models/article.ts
import { Model, Sequelize, DataTypes } from 'sequelize';

export default class Article extends Model {
  public title?: string;
  public content?: string;
  public author?: string;
  public attachments?: string[]; 
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
        author: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        attachments: {
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
  