<script lang="ts">
	import type { Departure } from '$lib/api/types';
	import DepartureRow from './DepartureRow.svelte';

	interface Props {
		title: string;
		departures: Departure[];
		showCountdown?: boolean;
		collapsed?: boolean;
	}

	let { title, departures, showCountdown = false, collapsed = false }: Props = $props();

	// svelte-ignore state_referenced_locally
	let open = $state(!collapsed);
</script>

<section class="section-table">
	<button class="section-header" onclick={() => (open = !open)} aria-expanded={open}>
		<span class="section-title">{title}</span>
		<span class="count">{departures?.length} polazaka</span>
		<span class="chevron" class:rotated={!open}>▾</span>
	</button>

	{#if open}
		{#if departures?.length === 0}
			<p class="empty">Nema polazaka.</p>
		{:else}
			<div class="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Vrijeme</th>
							<th>Linija</th>
							<th>Pravac</th>
							{#if showCountdown}<th></th>{/if}
						</tr>
					</thead>
					<tbody>
						{#each departures as departure, i (departure.time + '|' + departure.line + '|' + departure.route_info + '|' + i)}
							<DepartureRow {departure} {showCountdown} />
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	{/if}
</section>

<style>
	.section-table {
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.section-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.85rem 1rem;
		background: var(--color-surface);
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 1rem;
	}

	.section-header:hover {
		background: var(--color-hover);
	}

	.section-title {
		font-weight: 600;
		flex: 1;
		color: var(--color-text);
	}

	.count {
		font-size: 0.8rem;
		color: var(--color-muted);
	}

	.chevron {
		font-size: 1.1rem;
		color: var(--color-muted);
		transition: transform 0.2s;
		display: inline-block;
	}

	.chevron.rotated {
		transform: rotate(-90deg);
	}

	.table-wrap {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead th {
		padding: 0.4rem 0.75rem;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-muted);
		background: var(--color-bg);
		text-align: left;
		border-bottom: 1px solid var(--color-border);
	}

	.empty {
		padding: 1rem;
		color: var(--color-muted);
		font-size: 0.9rem;
	}
</style>
