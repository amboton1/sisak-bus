import { error } from '@sveltejs/kit';
import { getSchedule } from '$lib/api/schedule';
import type { DayKey } from '$lib/api/types';
import { DAY_KEYS } from '$lib/utils/labels';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const day = params.day as DayKey;

	if (!DAY_KEYS.includes(day)) {
		error(404, `Nepoznati dan: ${day}`);
	}

	const schedule = await getSchedule(day, fetch);
	return { schedule };
};
