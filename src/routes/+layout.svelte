<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Icon
	import Icon from '$lib/Icon.svelte';

	// Font Awesome
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';

	// Side Drawer
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	import { getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
	function drawerOpen(): void {
		drawerStore.open();
	}
</script>

<!-- Drawer -->
<Drawer width="auto">
	<AppRail>
		<AppRailAnchor href="/" on:click={drawerStore.close}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-home text-2xl" /></svelte:fragment>
			<span>Home</span>
		</AppRailAnchor>
		<AppRailAnchor href="/about" on:click={drawerStore.close}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-user text-2xl" /></svelte:fragment>
			<span>About</span>
		</AppRailAnchor>
		<AppRailAnchor href="/research" on:click={drawerStore.close}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-flask text-2xl" /></svelte:fragment>
			<span>Research</span>
		</AppRailAnchor>
		<AppRailAnchor href="/blog" on:click={drawerStore.close}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-blog text-2xl" /></svelte:fragment>
			<span>Blog</span>
		</AppRailAnchor>
		<AppRailAnchor href="/photo" on:click={drawerStore.close}>
			<svelte:fragment slot="lead"><i class="fa-solid fa-camera text-2xl" /></svelte:fragment>
			<span>Photo</span>
		</AppRailAnchor>
	</AppRail>
</Drawer>

<!-- <div class="btn-group-vertical">
	<button class="btn" on:click={drawerStore.close}>
		<i class="fa-solid fa-bars text-xl" />
	</button>
	<a href="/" class="btn btn-primary">
		<span>Home</span>
	</a>
	<a href="/about" class="btn btn-primary">
		<span>About</span>
	</a>
</div>

		<button class="btn flex flex-col" on:click={drawerStore.close}>
			<i class="fa-solid fa-bars text-xl" />
		</button>
		<a href="/" class="btn btn-primary">
			<span>Home</span>
		</a>
		<a href="/about" class="btn btn-primary">
			<span>About</span>
		</a>
		<a href="/research" class="btn btn-primary">
			<span>Research</span>
		</a>
		<a href="/blog" class="btn btn-primary">
			<span>Blog</span>
		</a>
		<a href="/photo" class="btn btn-primary">
			<span>Photo</span>
		</a>
	</div>
</Drawer> -->

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="lg:!hidden">
			<svelte:fragment slot="lead">
				<div class="flex items-center space-x-4">
					<!-- menu -->
					<button on:click={drawerOpen} class="btn-icon btn-icon-sm">
						<i class="fa-solid fa-bars text-xl" />
					</button>
					<!-- logo -->
					<a href="/" class="lg:!ml-0 w-[48px] lg:w-auto overflow-hidden">
						<Icon />
					</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="https://github.com/HongAo-Yang" target="_blank" rel="noreferrer">
					<i class="fa-brands text-[24px] fa-github" />
				</a>
				<a href="https://www.researchgate.net/profile/Hongao-Yang" target="_blank" rel="noreferrer">
					<i class="fa-brands text-[24px] fa-researchgate" />
				</a>
				<a href="mailto:yha21@tsinghua.edu.cn" target="_blank" rel="noreferrer">
					<i class="fa-solid text-[24px] fa-envelope" />
				</a>
				<LightSwitch /></svelte:fragment
			>
		</AppBar>
		<AppBar
			class="relative hidden lg:block"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<div class="flex item-center space-x-4">
					<!-- logo -->
					<a href="/" class="lg:!ml-0 w-[48px] lg:w-auto overflow-hidden">
						<Icon />
					</a>
				</div>
			</svelte:fragment>
			<TabGroup
				justify="justify-center"
				active="variant-filled-primary"
				hover="hover:variant-soft-primary"
				flex="flex-1 lg:flex-none"
				rounded=""
				border=""
				class="bg-surface-100-800-token w-full"
			>
				<TabAnchor href="/" selected={$page.url.pathname === '/'}>
					<span>Home</span>
				</TabAnchor>
				<TabAnchor href="/about" selected={$page.url.pathname === '/about'}>
					<span>About</span>
				</TabAnchor>
				<TabAnchor href="/research" selected={$page.url.pathname === '/research'}>
					<span>Research</span>
				</TabAnchor>
				<TabAnchor href="/blog" selected={$page.url.pathname === '/blog'}>
					<span>Blog</span>
				</TabAnchor>
				<TabAnchor href="/photo" selected={$page.url.pathname === '/photo'}>
					<span>Photo</span>
				</TabAnchor>
			</TabGroup>
			<svelte:fragment slot="trail">
				<a href="https://github.com/HongAo-Yang" target="_blank" rel="noreferrer">
					<i class="fa-brands text-[24px] fa-github" />
				</a>
				<a href="https://www.researchgate.net/profile/Hongao-Yang" target="_blank" rel="noreferrer">
					<i class="fa-brands text-[24px] fa-researchgate" />
				</a>
				<a href="mailto:yha21@tsinghua.edu.cn" target="_blank" rel="noreferrer">
					<i class="fa-solid text-[24px] fa-envelope" />
				</a>
				<LightSwitch /></svelte:fragment
			>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
