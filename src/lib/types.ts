export type Tags = 'sveltekit' | 'svelte'

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	cover: string
	tags: Tags[]
	published: boolean
}
