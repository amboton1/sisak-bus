<script lang="ts">
	import type { SectionKey } from '$lib/api/types';
	import DayTabs from '$lib/components/DayTabs.svelte';
	import RouteLegend from '$lib/components/RouteLegend.svelte';
	import SectionTable from '$lib/components/SectionTable.svelte';
	import { SECTION_LABELS } from '$lib/utils/labels';
	import { formatScrapedAt } from '$lib/utils/time';

	const SECTIONS: SectionKey[] = [
		'polazak_s_kolodvora',
		'polazak_iz_zeljezare',
		'kruzna_linija_5',
		'kruzna_linija_6'
	];

	const STOPS = ['Viktorovac', 'Naselje', 'Tržnica', 'Novo Praćno'];

	const STOP_CODES: Record<string, string> = {
		Viktorovac: 'V',
		Naselje: 'N',
		Tržnica: 'T',
		'Novo Praćno': 'P'
	};

	let { data } = $props();
	let schedule = $derived(data.schedule);
	let activeStop = $state<string | null>(null);

	function filteredDepartures(key: SectionKey) {
		const deps = schedule.sections[key];
		if (!activeStop) return deps;
		const code = STOP_CODES[activeStop];
		return deps.filter((d) => {
			const routeCode = d.route_info.split(' ').at(-1) ?? '';
			return routeCode.split('-').includes(code);
		});
	}
</script>

<svelte:head>
	<title>Vozni red — Sisak Bus</title>
</svelte:head>

<div class="page">
	<h1>Vozni red</h1>
	<DayTabs active={schedule.day} />

	<div class="stop-filter">
		{#each STOPS as stop}
			<button
				class="chip"
				class:active={activeStop === stop}
				onclick={() => (activeStop = activeStop === stop ? null : stop)}
			>
				{stop}
			</button>
		{/each}
	</div>

	<div class="sections">
		{#each SECTIONS as key}
			<SectionTable
				title={SECTION_LABELS[key]}
				departures={filteredDepartures(key)}
			/>
		{/each}
	</div>

	<RouteLegend />

	<p class="scraped-at">Podaci osvježeni: {formatScrapedAt(schedule.scraped_at)}</p>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 1.25rem;
	}

	.stop-filter {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.25rem;
	}

	.chip {
		padding: 0.35rem 0.85rem;
		border-radius: 999px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-muted);
		font-size: 0.85rem;
		cursor: pointer;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
	}

	.chip:hover {
		background: var(--color-hover);
		color: var(--color-text);
	}

	.chip.active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: #fff;
	}

	.sections {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.scraped-at {
		font-size: 0.78rem;
		color: var(--color-muted);
		margin-top: 1rem;
		text-align: right;
	}
</style>
