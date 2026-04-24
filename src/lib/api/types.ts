export type DayKey = 'radni_dan' | 'subota' | 'nedjelja';

export interface Departure {
	time: string;
	line: string;
	route_info: string;
}

export type SectionKey =
	| 'polazak_s_kolodvora'
	| 'polazak_iz_zeljezare'
	| 'kruzna_linija_5'
	| 'kruzna_linija_6';

export type Sections = Record<SectionKey, Departure[]>;

export interface ScheduleResponse {
	day: DayKey;
	scraped_at: string;
	sections: Sections;
}

export interface NextResponse {
	day: DayKey;
	current_time: string;
	from_section: SectionKey | null;
	next_departures: Sections;
}

export interface HealthResponse {
	status: string;
	scraped_at: string;
	days_available: DayKey[];
}
