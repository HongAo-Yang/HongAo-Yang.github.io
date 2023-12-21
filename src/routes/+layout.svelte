<script>
	import Icon from '@iconify/svelte';

	import { theme } from '$lib/stores';
	function toggleTheme() {
		theme.update((t) => (t === 'light' ? 'dark' : 'light'));
	}
</script>

<meta name="color-scheme" content={$theme} />
<link rel="stylesheet" href={`/theme/${$theme}.css`} />

<!-- Header section -->
<header>
	<div class="left-spacer"></div>
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/research">Research</a>
		<a href="/blog">Blog</a>
		<a href="/photo">Photo</a>
	</nav>
	<button class="theme-button" on:click={toggleTheme}>
		{#if $theme === 'light'}
			<Icon icon="octicon:moon-16" width="14pt" />
		{:else}
			<Icon icon="octicon:sun-16" width="14pt" />
		{/if}
	</button>
</header>

<!-- Slot for page-specific content -->
<slot />
<body> </body>

<!-- Footer section -->
<footer>
	<a href="https://github.com/HongAo-Yang"> <Icon icon="octicon:mark-github" width="14pt" /></a>
	<a href="https://www.researchgate.net/profile/Hongao-Yang"
		><Icon icon="academicons:researchgate-square" width="14pt" /></a
	>
	<a href="mailto:yha21@tsinghua.edu.cn">
		<Icon icon="mdi:email" width="16pt" />
	</a>
</footer>

<style>
	/* Global styles */
	body {
		font-family: 'Arial', sans-serif;
		padding: 0;
		max-width: 800px;
		margin: 0 auto;
		background-color: var(--backgroundcolor);
		color: var(--textcolor);
	}
	button {
		border: none; /* Remove border */
		background-color: var(--headerfooterbackgroundcolor);
	}
	button:hover {
		cursor: pointer;
		color: var(--linkcolor);
	}

	/* Header styling */
	header {
		background-color: var(--headerfooterbackgroundcolor);
		padding: 1rem 0;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}

	.left-spacer {
		grid-column: 1/2;
	}
	nav {
		display: flex;
		justify-content: center;
		grid-column: 2/3;
	}

	nav a {
		margin: 0 1rem;
		text-decoration: none;
		color: var(--headerfootertextcolor);
		font-weight: bold;
	}

	nav a:hover {
		color: var(--linkcolor);
	}

	.theme-button {
		margin-right: 1rem;
		grid-column: 3/4;
	}

	/* Footer styling */
	footer {
		background-color: var(--headerfooterbackgroundcolor);
		padding: 1rem 0;
		display: flex; /* Use flexbox */
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	footer a {
		margin: 0 1rem;
		text-decoration: none;
		color: var(--headerfootertextcolor);
	}

	footer a:hover {
		color: var(--linkcolor);
	}
</style>
