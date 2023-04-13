import { extendType, idArg, mutationField, nonNull, stringArg } from 'nexus';

export const addPost = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('createDraft', {
			description: 'Add a draft post',
			type: 'Post',
			args: {
				title: nonNull(stringArg()),
				content: nonNull(stringArg()),
			},
			resolve: async (_root, args, ctx) => {
				const post = {
					title: args.title,
					content: args.content,
					published: false,
				};
				return ctx.db.post.create({ data: post });
			},
		});
	},
});

export const publishPost = mutationField((t) => {
	t.nonNull.field('publish', {
		type: 'Post',
		args: {
			id: nonNull(idArg()),
		},
		description: 'Publish an article',
		resolve: async (_root, args, ctx) => {
			return ctx.db.post.update({
				where: { id: args.id },
				data: { published: true },
			});
		},
	});
});

export const deletePost = mutationField((t) => {
	t.nonNull.field('deletePost', {
		type: 'Post',
		args: {
			id: nonNull(idArg()),
		},
		description: 'Delete an article',
		resolve: async (_root, args, ctx) => {
			return ctx.db.post.delete({
				where: { id: args.id },
			});
		},
	});
});
