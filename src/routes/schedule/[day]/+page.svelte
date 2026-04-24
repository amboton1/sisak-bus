<script lang="ts">
	import type { SectionKey } from '$lib/api/types';
	import DayTabs from '$lib/components/DayTabs.svelte';
	import SectionTable from '$lib/components/SectionTable.svelte';
	import { SECTION_LABELS } from '$lib/utils/labels';
	import { formatScrapedAt } from '$lib/utils/time';

	const SECTIONS: SectionKey[] = [
		'polazak_s_kolodvora',
		'polazak_iz_zeljezare',
		'kruzna_linija_5',
		'kruzna_linija_6'
	];

	let { data } = $props();
	let schedule = $derived(data.schedule);
</script>

<svelte:head>
	<title>Vozni red — Sisak Bus</title>
</svelte:head>

<div class="page">
	<h1>Vozni red</h1>
	<DayTabs active={schedule.day} />

	<div class="sections">
		{#each SECTIONS as key}
			<SectionTable
				title={SECTION_LABELS[key]}
				departures={schedule.sections[key]}
			/>
		{/each}
	</div>

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
