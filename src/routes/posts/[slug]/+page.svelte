<script lang="ts">
	import { formatDate } from '$lib/utils';
	import 'prismjs/themes/prism-okaidia.css';
	export let data;
</script>

<div class="page-container-narrow">
	<!-- cover -->
	<img
		src={`/src/posts/${data.slug}/${data.meta.cover}`}
		alt={data.meta.title}
		class="w-full h-48 object-cover"
	/>
	<!-- title -->
	<h1 class="h1">
		{data.meta.title}
	</h1>
	<!-- meta -->
	<div class="flex flex-row justify-between space-y-2">
		<div class="space-x-2">
			<i class="fa-solid fa-calendar-day" />
			<span>{formatDate(data.meta.date)}</span>
		</div>
		<div class="space-x-2">
			<i class="fa-solid fa-tag" />
			{#each data.meta.tags as tag}
				<a href="../posts?tag={tag}" class="text-primary-500">{tag}</a>
			{/each}
		</div>
	</div>
	<!-- content -->
	<article class="prose">
		<svelte:component this={data.content} />
	</article>
</div>
