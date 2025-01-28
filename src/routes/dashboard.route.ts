import axios from 'axios';
import { Router, Request, Response } from 'express';
import { base_url } from '../config';
import { isAuthenticated} from "../middlewares";

const router = Router();


router.get('/', isAuthenticated, (req, res) => {

    axios.get(`${base_url}/articles`)
    .then(function(response) {
        return res.render('admin/dashboard', response.data);
    })
    .catch(err => {
        return res.render('error')
    })

});

router.get('/article/add', isAuthenticated, (req, res) => {
    return res.render('admin/dashboard/add_article');

});


router.get('/article/edit/:id', isAuthenticated, (req, res) => {
    const articleId = req.params.id; 
    axios.get(`${base_url}/articles/${articleId}`)
        .then(function(article) {
            return res.render("admin/dashboard/edit_article", article.data);
        })
        .catch(err => {
            return res.render('error');
        });
});

export default router;