<script lang="ts">
	import NextDepartures from '$lib/components/NextDepartures.svelte';
	import { getCurrentDayKey } from '$lib/utils/time';
	import { DAY_LABELS } from '$lib/utils/labels';

	const dayLabel = DAY_LABELS[getCurrentDayKey()];
</script>

<svelte:head>
	<title>Sljedeći polasci — Sisak Bus</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Sljedeći polasci</h1>
		<p class="subtitle">{dayLabel} · automatski se osvježava</p>
	</div>
	<NextDepartures />
	<p class="hint">
		Pogledaj <a href="/schedule">cijeli vozni red</a>.
	</p>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.page-header {
		margin-bottom: 0.5rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 0.25rem;
	}

	.subtitle {
		font-size: 0.875rem;
		color: var(--color-muted);
		margin: 0;
	}

	.hint {
		font-size: 0.875rem;
		color: var(--color-muted);
		margin-top: 0.5rem;
	}
</style>
