<script lang="ts">
	import { getNext } from '$lib/api/schedule';
	import type { NextResponse, SectionKey } from '$lib/api/types';
	import { SECTION_LABELS } from '$lib/utils/labels';
	import DepartureRow from './DepartureRow.svelte';

	const POLL_INTERVAL = 30_000;
	const SECTIONS: SectionKey[] = [
		'polazak_s_kolodvora',
		'polazak_iz_zeljezare',
		'kruzna_linija_5',
		'kruzna_linija_6'
	];

	let data = $state<NextResponse | null>(null);
	let error = $state<string | null>(null);
	let loading = $state(true);

	async function load() {
		try {
			data = await getNext({ limit: 5 });
			error = null;
		} catch (e) {
			error = 'Nije moguće dohvatiti podatke. Pokušajte ponovo.';
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		load();
		const id = setInterval(load, POLL_INTERVAL);
		return () => clearInterval(id);
	});
</script>

<div class="next-departures">
	{#if loading}
		<p class="status">Učitavanje...</p>
	{:else if error}
		<p class="status error">{error}</p>
	{:else if data}
		<p class="meta">Trenutno vrijeme: <strong>{data.current_time}</strong></p>
		<div class="sections">
			{#each SECTIONS as key}
				{@const departures = data.next_departures[key]}
				{#if departures && departures.length > 0}
					<div class="section-block">
						<h3 class="section-title">{SECTION_LABELS[key]}</h3>
						<div class="table-wrap">
							<table>
								<tbody>
									{#each departures as departure, i (departure.time + '|' + departure.line + '|' + departure.route_info + '|' + i)}
										<DepartureRow {departure} showCountdown />
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.next-departures {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.meta {
		font-size: 0.85rem;
		color: var(--color-muted);
		margin-bottom: 0.25rem;
	}

	.sections {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.sections {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.section-block {
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.section-title {
		padding: 0.65rem 1rem;
		font-size: 0.9rem;
		font-weight: 600;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		margin: 0;
		color: var(--color-text);
	}

	.table-wrap {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	.status {
		color: var(--color-muted);
		padding: 2rem 0;
		text-align: center;
	}

	.error {
		color: var(--color-error);
	}
</style>
