<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<header class="header">
		<div class="container">
			<a href="/" class="logo">
				<span class="logo-icon">🚌</span>
				<span class="logo-text">Sisak Bus</span>
			</a>
			<nav class="nav">
				<a href="/">Sljedeći</a>
				<a href="/schedule">Vozni red</a>
			</nav>
		</div>
	</header>

	<main class="main">
		<div class="container">
			{@render children()}
		</div>
	</main>

	<footer class="footer">
		<div class="container">
			<p>Podatci dohvaćeni s <a href="https://e-karta.si" target="_blank" rel="noreferrer">e-karta.si</a></p>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	.header {
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.header .container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 3.5rem;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		text-decoration: none;
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--color-text);
	}

	.logo-icon {
		font-size: 1.3rem;
	}

	.nav {
		display: flex;
		gap: 1.25rem;
	}

	.nav a {
		text-decoration: none;
		font-size: 0.95rem;
		color: var(--color-muted);
		font-weight: 500;
		transition: color 0.15s;
	}

	.nav a:hover {
		color: var(--color-text);
	}

	.main {
		flex: 1;
		padding: 1.5rem 0 2rem;
	}

	.footer {
		border-top: 1px solid var(--color-border);
		padding: 1rem 0;
	}

	.footer p {
		font-size: 0.8rem;
		color: var(--color-muted);
		margin: 0;
		text-align: center;
	}
</style>
