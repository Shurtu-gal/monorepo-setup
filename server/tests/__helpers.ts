import { GraphQLClient } from 'graphql-request';
import getPort, { makeRange } from 'get-port';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { Context } from '../src/utils/context';
import init from '../src/config/apollo';

interface TestContext {
	client: GraphQLClient;
}

const app = express();

const graphqlTestContext = () => {
	let serverInstance: ApolloServer<Context> | null = null;
	return {
		async before() {
			const port = await getPort({ port: makeRange(4000, 6000) });
			serverInstance = await init(app, port);

			return new GraphQLClient(`http://localhost:${port}/graphql`);
		},

		async after() {
			if (serverInstance) {
				await serverInstance.stop();
			}
		},
	};
};

export const createTestContext = (): TestContext => {
	const ctx = {} as TestContext;
	const graphqlCtx = graphqlTestContext();

	beforeEach(async () => {
		const client = await graphqlCtx.before();

		Object.assign(ctx, {
			client,
		});
	});

	afterEach(async () => {
		await graphqlCtx.after();
	});

	return ctx;
};
