import { createTestContext } from './__helpers';

interface Post {
	id: string;
	title: string;
	content: string;
	published: boolean;
}
const ctx = createTestContext();

it('ensures that the post is created', async () => {
	// Create a new post
	const createPost: { createDraft: Post } = await ctx.client.request(`
		mutation {
			createDraft(title: "Test", content: "...") {
				id
				title
				content
				published
			}
		}
	`);

	// Snapshot that draft and expect `published` to be false
	expect(createPost.createDraft.published).toBe(false);
	expect(createPost.createDraft.id).not.toBeNull();
	expect(createPost.createDraft.title).toMatch('Test');

	// Publish the previously created draft
	const publishResult: { publish: Post } = await ctx.client.request(
		`
    mutation publishDraft($draftId: ID!) {
      publish(id: $draftId) {
        id
        title
        content
        published
      }
    }
  `,
		{ draftId: createPost.createDraft.id },
	);

	// Snapshot the published draft and expect `published` to be true
	expect(publishResult.publish.id).toMatch(createPost.createDraft.id);
	expect(publishResult.publish.published).toBe(true);

	// Delete the previously created draft
	await ctx.client.request(
		`
    mutation deleteDraft($draftId: ID!) {
      deletePost(id: $draftId) {
        id
        title
        content
        published
      }
    }
  `,
		{ draftId: createPost.createDraft.id },
	);
});
