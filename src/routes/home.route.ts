import axios from 'axios';
import { Router, Request, Response } from 'express';
import { base_url,articles_per_page} from '../config';

const router = Router();

router.get('/articles/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const articleId = req.params.id; // Extract article ID from URL params

        if (!articleId) {
            return res.render('error', { message: 'Article ID is required.' });
        }

        // Fetch the article by ID
        const response = await axios.get(`${base_url}/articles/${articleId}`);

        if (!response.data || !response.data.article) {
            return res.render('error', { message: 'Article not found.' });
        }

        // Render the article page with the retrieved data
        res.render('article.ejs', { article: response.data.article });
    } catch (err) {
        console.error('Error fetching article:', err);
        return res.render('error', { message: 'An error occurred while fetching the article.' });
    }
});


router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Current page number
        const search = req.query.search as string || ''; // Search query

        // Fetch articles from the API with optional search parameter
        const response = await axios.get(`${base_url}/articles`, {
            params: { search } // Pass search query to API
        });
        const allArticles = response.data.articles; // Update based on actual structure

        if (!Array.isArray(allArticles)) {
            return res.render('error');
        }

        const totalArticles = allArticles.length;

        // Paginate the articles
        const startIndex = (page - 1) * articles_per_page;
        const paginatedArticles = allArticles.slice(startIndex, startIndex + articles_per_page);
        const hasPrevious = page > 1;
        const hasNext = page < Math.ceil(totalArticles / articles_per_page);

        // Render the articles page
        res.render('home.ejs', {
            articles: paginatedArticles, // Pass the current page of articles
            hasPrevious,
            hasNext,
            previousPage: page - 1,
            nextPage: page + 1,
            search, // Include search term to prefill search input
            totalArticles // Optional: to display total count if needed
        });
    } catch (err) {
        console.error('Error fetching articles:', err);
        return res.render('error');
    }
});




export default router;
