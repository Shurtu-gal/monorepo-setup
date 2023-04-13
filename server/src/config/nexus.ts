import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from '@/graphql';

export const schema = makeSchema({
	types,
	outputs: {
		typegen: join(__dirname, '..', 'nexus_gen', 'nexus-typegen.ts'),
		schema: join(__dirname, '..', 'nexus_gen', 'schema.graphql'),
	},
	contextType: {
		module: join(__dirname, '../utils/context.ts'),
		export: 'Context',
	},
});
