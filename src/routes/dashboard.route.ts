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

export default router;