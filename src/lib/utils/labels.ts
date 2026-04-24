import type { DayKey, SectionKey } from '$lib/api/types';

export const DAY_LABELS: Record<DayKey, string> = {
	radni_dan: 'Radni dan',
	subota: 'Subota',
	nedjelja: 'Nedjelja'
};

export const SECTION_LABELS: Record<SectionKey, string> = {
	polazak_s_kolodvora: 'Polazak s kolodvora',
	polazak_iz_zeljezare: 'Polazak iz Željezare',
	kruzna_linija_5: 'Kružna linija 5',
	kruzna_linija_6: 'Kružna linija 6'
};

export const DAY_KEYS: DayKey[] = ['radni_dan', 'subota', 'nedjelja'];
