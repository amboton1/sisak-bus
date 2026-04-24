import { redirect } from '@sveltejs/kit';
import { getCurrentDayKey } from '$lib/utils/time';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	redirect(302, `/schedule/${getCurrentDayKey()}`);
};
