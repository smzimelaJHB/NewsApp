import http from 'http';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { port } from './config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import session from 'express-session';
import flash from 'connect-flash';

import homeRoutes from './routes/home.route';
import usersRoutes from './routes/users.routes';
import articlesRoutes from './routes/articles.route';
import dashboardRoutes from './routes/dashboard.route'


const app = express();

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: true,
  })
);

app.use(flash());

// Custom middleware to attach flash messages to the response locals
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.successMessage = req.flash('success');
  res.locals.errorMessage = req.flash('error');
  next();
});

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'assets')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/admin/users', usersRoutes);
app.use('/articles', articlesRoutes);


const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});