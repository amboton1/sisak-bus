<script lang="ts">
	import { formatCountdown, minutesUntil } from '$lib/utils/time';

	interface Props {
		time: string;
	}

	let { time }: Props = $props();

	// svelte-ignore state_referenced_locally
	let label = $state(formatCountdown(time));
	// svelte-ignore state_referenced_locally
	let diff = $state(minutesUntil(time));

	$effect(() => {
		const tick = () => {
			label = formatCountdown(time);
			diff = minutesUntil(time);
		};
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	});
</script>

<span
	class="badge"
	class:soon={diff >= 0 && diff <= 10}
	class:departed={diff < 0}
>
	{label}
</span>

<style>
	.badge {
		display: inline-block;
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
		background-color: var(--color-badge-bg);
		color: var(--color-badge-text);
	}

	.soon {
		background-color: var(--color-warning-bg);
		color: var(--color-warning-text);
	}

	.departed {
		background-color: var(--color-muted-bg);
		color: var(--color-muted);
	}
</style>
