import cors from 'cors';
import { config } from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import path from 'path';

import { winston } from '@/config/winston';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { Context, context } from '@/utils/context';
import { schema } from './nexus';

config({
	path:
		process.env.NODE_ENV === 'production'
			? path.join(__dirname, '../../env/.env.production')
			: path.join(__dirname, '../../env/.env.development'),
	debug: process.env.NODE_ENV !== 'production',
});
const WHITELIST: string[] = process.env.ALLOWED_ORIGINS?.split(',') || [];

const corsOptions: cors.CorsOptions = {
	origin: (origin, callback) => {
		if (WHITELIST.indexOf(origin || '') !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

const init = async (app: Express, PORT: number) => {
	const logger = winston('Apollo');

	const httpServer = http.createServer(app);

	const server = new ApolloServer<Context>({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();

	app.use('/', express.json(), express.urlencoded({ extended: true }), cors<cors.CorsRequest>(corsOptions));

	app.use(
		'/graphql',
		expressMiddleware(server, {
			context,
		}),
	);

	// eslint-disable-next-line no-promise-executor-return
	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
	logger.info(`⚡️ [server]: Server listening at http://localhost:${PORT}/`);
	logger.info(`⚡️ [server]: Apollo server listening at http://localhost:${PORT}/graphql`);
	return server;
};

export default init;
