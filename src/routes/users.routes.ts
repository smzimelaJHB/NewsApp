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

export default router;
