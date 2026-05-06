<script lang="ts">
	const ROUTES: { code: string; stops: string[] }[] = [
		{ code: 'V', stops: ['Željezara', 'Viktorovac', 'Zeleni Brijeg', 'Kolodvor'] },
		{ code: 'N', stops: ['Željezara', 'Naselje', 'Kolodvor'] },
		{ code: 'V-T', stops: ['Željezara', 'Viktorovac', 'Zeleni Brijeg', 'Tržnica', 'Kolodvor'] },
		{ code: 'N-T', stops: ['Željezara', 'Naselje', 'Tržnica', 'Kolodvor'] },
		{ code: 'P-N-T', stops: ['Željezara', 'Novo Praćno', 'Naselje', 'Tržnica', 'Kolodvor'] },
		{ code: 'N-P', stops: ['Kolodvor', 'Naselje', 'Novo Praćno', 'Željezara'] },
		{
			code: 'V-AK',
			stops: ['Željezara', 'Viktorovac', 'Zeleni Brijeg', 'Kolodvor'],
			note: 'samo do Kolodvora (isključenje)'
		}
	];
</script>

<details class="legend">
	<summary>Oznake ruta</summary>
	<ul>
		{#each ROUTES as route}
			<li>
				<span class="code">{route.code}</span>
				<span class="stops">
					{#each route.stops as stop, i}
						{#if i > 0}<span class="arrow">→</span>{/if}{stop}
					{/each}
					{#if route.note}
						<span class="note">({route.note})</span>
					{/if}
				</span>
			</li>
		{/each}
	</ul>
</details>

<style>
	.legend {
		font-size: 0.82rem;
		color: var(--color-muted);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--color-surface);
	}

	summary {
		cursor: pointer;
		font-weight: 600;
		color: var(--color-text);
		user-select: none;
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	summary::before {
		content: '▸';
		font-size: 0.7rem;
		transition: transform 0.15s;
		color: var(--color-muted);
	}

	.legend[open] summary::before {
		transform: rotate(90deg);
	}

	ul {
		margin: 0.6rem 0 0.2rem;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	li {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
	}

	.code {
		font-weight: 700;
		font-size: 0.78rem;
		color: var(--color-badge-text);
		background: var(--color-badge-bg);
		border-radius: 0.25rem;
		padding: 0.1rem 0.35rem;
		white-space: nowrap;
		min-width: 3.5rem;
		text-align: center;
		flex-shrink: 0;
	}

	.stops {
		color: var(--color-text);
	}

	.arrow {
		color: var(--color-muted);
		margin: 0 0.2rem;
	}

	.note {
		color: var(--color-muted);
		font-style: italic;
	}
</style>
