import type { DayKey } from '$lib/api/types';

/** Parse "HH:MM" into total minutes since midnight */
export function toMinutes(time: string): number {
	const [h, m] = time.split(':').map(Number);
	return h * 60 + m;
}

/** Minutes remaining until a departure time string; negative means already departed */
export function minutesUntil(departureTime: string): number {
	const now = new Date();
	const nowMinutes = now.getHours() * 60 + now.getMinutes();
	return toMinutes(departureTime) - nowMinutes;
}

/** "za 4 min" / "za 1h 2min" / "odlazi" / "prošlo" */
export function formatCountdown(departureTime: string): string {
	const diff = minutesUntil(departureTime);
	if (diff < 0) return 'prošlo';
	if (diff === 0) return 'odlazi';
	if (diff < 60) return `za ${diff} min`;
	const h = Math.floor(diff / 60);
	const m = diff % 60;
	return m === 0 ? `za ${h}h` : `za ${h}h ${m}min`;
}

/** Determine the current day type based on the local date */
export function getCurrentDayKey(): DayKey {
	const dow = new Date().getDay(); // 0=Sun, 6=Sat
	if (dow === 0) return 'nedjelja';
	if (dow === 6) return 'subota';
	return 'radni_dan';
}

/** Format an ISO timestamp to a readable Croatian locale string */
export function formatScrapedAt(iso: string): string {
	return new Date(iso).toLocaleString('hr-HR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}
