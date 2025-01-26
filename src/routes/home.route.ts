import axios from 'axios';
import { Router, Request, Response } from 'express';
import { base_url } from '../config';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Current page number
        const search = req.query.search as string || ''; // Search query
        const articlesPerPage = 1; // Only one article per page

        // Fetch articles from the API with optional search parameter
        const response = await axios.get(`${base_url}/articles`, {
            params: { search } // Pass search query to API
        });
        const allArticles = response.data.articles; // Update based on actual structure

        if (!Array.isArray(allArticles)) {
            return res.render('error')
        }

        const totalArticles = allArticles.length;

        // Paginate the articles
        const startIndex = (page - 1) * articlesPerPage;
        const paginatedArticles = allArticles.slice(startIndex, startIndex + articlesPerPage);
        const hasPrevious = page > 1;
        const hasNext = page < Math.ceil(totalArticles / articlesPerPage);

        // Render the page
        res.render('home.ejs', {
            articles: paginatedArticles, // Pass only the current article
            hasPrevious,
            hasNext,
            previousPage: page - 1,
            nextPage: page + 1,
            search // Include search term to prefill search input
        });
    } catch (err) {
        return res.render('error')
    }
});


export default router;
