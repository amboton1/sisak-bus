<script lang="ts">
	import type { Departure } from '$lib/api/types';
	import CountdownBadge from './CountdownBadge.svelte';

	interface Props {
		departure: Departure;
		showCountdown?: boolean;
	}

	let { departure, showCountdown = false }: Props = $props();
</script>

<tr class="departure-row">
	<td class="time">{departure.time}</td>
	<td class="line">{departure.line}</td>
	<td class="route">{departure.route_info}</td>
	{#if showCountdown}
		<td class="countdown">
			<CountdownBadge time={departure.time} />
		</td>
	{/if}
</tr>

<style>
	.departure-row {
		border-bottom: 1px solid var(--color-border);
		transition: background-color 0.15s;
	}

	.departure-row:hover {
		background-color: var(--color-hover);
	}

	td {
		padding: 0.6rem 0.75rem;
		vertical-align: middle;
	}

	.time {
		font-variant-numeric: tabular-nums;
		font-weight: 600;
		color: var(--color-primary);
		white-space: nowrap;
		width: 4rem;
	}

	.line {
		font-size: 0.8rem;
		color: var(--color-muted);
		white-space: nowrap;
		width: 5rem;
	}

	.route {
		font-size: 0.9rem;
		color: var(--color-text);
	}

	.countdown {
		text-align: right;
		white-space: nowrap;
	}
</style>
