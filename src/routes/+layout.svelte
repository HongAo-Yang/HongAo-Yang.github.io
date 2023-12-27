<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
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

	// Font Awesome
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/" class="lg:!ml-0 w-[48px] lg:w-auto overflow-hidden">
					<svg
						class="fill-token"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 178 160"
						height="32px"
					>
						<polygon
							points="138 0 138 80 78 80 116 0 76 0 58 37.89 40 0 0 0 38 80 38 160 78 160 78 100 138 100 138 160 178 160 178 0 138 0"
						/>
					</svg>
				</a>
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
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<svelte:fragment slot="footer">
		<div class="bg-surface-100-800-token w-full flex justify-center items-center gap-4 py-5">
			<a href="https://github.com/HongAo-Yang"> <i class="fa-brands text-[24px] fa-github" /> </a>
			<a href="https://www.researchgate.net/profile/Hongao-Yang">
				<i class="fa-brands text-[24px] fa-researchgate" />
			</a>
			<a href="mailto:yha21@tsinghua.edu.cn"> <i class="fa-solid text-[24px] fa-envelope" /> </a>
		</div>
	</svelte:fragment>
</AppShell>
