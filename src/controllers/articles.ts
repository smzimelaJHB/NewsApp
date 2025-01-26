import { Request, Response } from 'express';
import Article, {ArticleMap} from '../models/article'; 
import database from '../database';
import { Op, Sequelize } from 'sequelize';


// Get all articles
export const getAllArticles = async (req: Request, res: Response) => {
  ArticleMap(database);
  try {
    const articles = await Article.findAll();
    res.status(200).json({ articles:articles});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error });
  }
};


// Get an article by ID
export const getArticleById = async (req: Request, res: Response) => {
  ArticleMap(database);
  const id = Number(req.params.id);
  try {
    const article = await Article.findByPk(id);
    if (article) {
      res.status(200).json({ article });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error });
  }
};


// Create a new article
export const createArticle = async (req: Request, res: Response) => {
  ArticleMap(database);
  const { title, content, image, tags } = req.body; 
  try {
    const newArticle = await Article.create({  title, content, image, tags  });
    res.status(201).json({ article: newArticle });
  } catch (error) {
    res.status(400).json({ message: 'Error creating article', error });
  }
};


// Update an article
export const updateArticle = async (req: Request, res: Response) => {
  ArticleMap(database);
  const id = Number(req.params.id);
  const {  title, content, image, tags  } = req.body;
  try {
    const article = await Article.findByPk(id);
    if (article) {
      await article.update({  title, content, image, tags  });
      res.status(200).json({ article });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating article', error });
  }
};


// Delete an article
export const deleteArticle = async (req: Request, res: Response) => {
  ArticleMap(database);
  const id = Number(req.params.id);
  try {
    const article = await Article.findByPk(id);
    if (article) {
      await article.destroy();
      res.status(200).json({ message: 'Article deleted successfully' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article', error });
  }
};


// // Search articles by title or content
export const searchArticles = async (req: Request, res: Response): Promise<void> => {
  ArticleMap(database);
  const { query } = req.body;

  if (!query) {
    res.status(400).json({ message: 'Search query is required' });
    return;
  }

  try {
    const articles = await Article.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          Sequelize.literal(`array_to_string("tags", ',') LIKE '%${query}%'`)
        ],
      },
    });
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ message: 'Error searching articles', error });
  }
};
