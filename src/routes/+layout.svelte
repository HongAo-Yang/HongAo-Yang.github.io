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
	<div class="nav-container">
		<nav>
			<!-- Navigation links -->
			<a href="/">Home</a>
			<a href="/about">About</a>
			<a href="/blog">Blog</a>
		</nav>
	</div>
	<div class="toggle-theme-container">
		<button on:click={toggleTheme}>
			{#if $theme === 'light'}
				<Icon icon="octicon:moon-16" width="14pt" />
			{:else}
				<Icon icon="octicon:sun-16" width="14pt" />
			{/if}
		</button>
	</div>
</header>

<!-- Slot for page-specific content -->
<slot />
<body> </body>
<!-- Footer section -->
<footer>
	<a href="https://github.com/HongAo-Yang/blog"
		><Icon icon="octicon:mark-github" width="14pt" />Source code</a
	>
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
		display: flex; /* Use flexbox */
		justify-content: space-between; /* Aligns children to each end */
		align-items: center; /* Vertically centers children */
	}

	.nav-container {
		flex-grow: 1; /* Allows the container to grow and take up available space */
		text-align: center; /* Center aligns the nav links */
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
	.toggle-theme-container {
		margin-right: 1rem;
	}

	/* Footer styling */
	footer {
		background-color: var(--headerfooterbackgroundcolor);
		padding: 1rem 0;
		text-align: center;
	}

	footer a {
		text-decoration: none;
		color: var(--headerfootertextcolor);
		font-weight: bold;
		display: flex;
		place-content: center;
		gap: 5pt;
	}

	footer a:hover {
		color: var(--linkcolor);
	}
</style>
