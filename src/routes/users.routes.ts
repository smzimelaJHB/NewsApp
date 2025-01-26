import { Router } from 'express';
import { getAllUsers, userLogin, createUser } from '../controllers/user';
import { isAuthenticated} from "../middlewares";

const router = Router();

// GET - users
router.get('/',isAuthenticated, getAllUsers);

// POST -  login by user email
router.post('/login',userLogin);

// POST - create user
router.post('/', createUser);


router.get('/login' , (req , res, next)=>{
    return res.status(200).render('admin/login',{
        page: 'Login',
    })
})
router.get('/register' , (req , res, next)=>{
    return res.status(200).render('admin/register',{
        page: 'Register',
    })
})
 

export default router;
