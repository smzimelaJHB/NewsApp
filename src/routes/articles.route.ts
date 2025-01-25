import { Router } from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  searchArticles
} from '../controllers/articles';
import { isAuthenticated} from "../middlewares";


const router = Router();

// GET - all articles with images
router.get('/', getAllArticles);

// GET - article with images by ID
router.get('/:id', getArticleById);

// POST - create article with images
router.post('/',isAuthenticated,createArticle);

// PUT - update article with images
router.put('/:id',isAuthenticated, updateArticle);

// DELETE - delete article and its images
router.delete('/:id',isAuthenticated, deleteArticle);

// POST - search for specific article
router.post('/search', searchArticles)



export default router;
