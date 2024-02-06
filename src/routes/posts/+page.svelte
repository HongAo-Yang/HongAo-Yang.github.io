<script lang="ts">
	import { formatDate } from '$lib/utils';

	export let data;
</script>

<!-- Posts -->
<div class="page-container">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.posts as post}
			<div class="flex flex-col justify-between p-4 space-y-2">
				<img src={post.cover} alt={post.title} class="w-full h-48 object-cover" />
				<a href="posts/{post.slug}" class="text-primary-500 text-xl font-bold">{post.title}</a>
				<div class="space-x-2">
					<i class="fa-solid fa-calendar-day" />
					<span>{formatDate(post.date)}</span>
				</div>
				<div class="space-x-2">
					<i class="fa-solid fa-tag" />
					{#each post.tags as tag}
						<a href="posts?tag={tag}" class="text-primary-500">{tag}</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
