import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(`../../../posts/${params.slug}/main.md`)
		
		return {
			content: post.default,
			meta: post.metadata,
			slug: params.slug
		}
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`)
	}
}