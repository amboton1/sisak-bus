<script lang="ts">
	import type { DayKey } from '$lib/api/types';
	import { DAY_KEYS, DAY_LABELS } from '$lib/utils/labels';

	interface Props {
		active: DayKey;
	}

	let { active }: Props = $props();
</script>

<nav class="day-tabs" aria-label="Odabir dana">
	{#each DAY_KEYS as day}
		<a
			href="/schedule/{day}"
			class="tab"
			class:active={day === active}
			aria-current={day === active ? 'page' : undefined}
		>
			{DAY_LABELS[day]}
		</a>
	{/each}
</nav>

<style>
	.day-tabs {
		display: flex;
		gap: 0.25rem;
		border-bottom: 2px solid var(--color-border);
		margin-bottom: 1.5rem;
	}

	.tab {
		padding: 0.6rem 1rem;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-muted);
		text-decoration: none;
		border-bottom: 2px solid transparent;
		margin-bottom: -2px;
		transition: color 0.15s, border-color 0.15s;
		border-radius: 0.25rem 0.25rem 0 0;
	}

	.tab:hover {
		color: var(--color-text);
	}

	.tab.active {
		color: var(--color-primary);
		border-bottom-color: var(--color-primary);
	}
</style>
