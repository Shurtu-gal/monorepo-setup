import express, { Express, Request, Response } from 'express';
import init from '@/config/apollo';

const PORT: number = parseInt(process.env.PORT || '3000', 10);

const app: Express = express();
init(app, PORT);

app.get('/', (_: Request, res: Response) => {
	res.send('Hello World!');
});
