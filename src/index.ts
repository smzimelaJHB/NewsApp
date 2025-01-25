// src/index.ts
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { port } from './config';
import usersRoutes from './routes/users.routes';
import articlesRoutes from './routes/articles.route';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World'
  });
});


app.use('/admin/users', usersRoutes);
app.use('/articles', articlesRoutes);


const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});