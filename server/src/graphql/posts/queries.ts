import { extendType } from 'nexus';

export const PostQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.list.field('drafts', {
			type: 'Post',
			resolve: (_root, _args, ctx) => {
				return ctx.db.post.findMany({
					where: { published: false },
				});
			},
		});
	},
});
