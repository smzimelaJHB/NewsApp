// src/index.ts
import http from 'http';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { port } from './config';
import usersRoutes from './routes/users.routes';
import articlesRoutes from './routes/articles.route';
import homeRoutes from './routes/home.route';




const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'))

app.use('/', homeRoutes);
app.use('/admin/users', usersRoutes);
app.use('/articles', articlesRoutes);


const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});