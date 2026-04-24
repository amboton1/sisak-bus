import { get } from "./client";
import type {
  DayKey,
  NextResponse,
  ScheduleResponse,
  SectionKey,
  Sections,
} from "./types";

export async function getSchedule(
  day: DayKey,
  fetchFn?: typeof fetch,
): Promise<ScheduleResponse> {
  return get<ScheduleResponse>(`/schedule/${day}`, fetchFn);
}

export async function getNext(
  options: { from?: SectionKey; limit?: number } = {},
  fetchFn?: typeof fetch,
): Promise<NextResponse> {
  const params = new URLSearchParams();
  if (options.from) params.set("from", options.from);
  if (options.limit !== undefined) params.set("limit", String(options.limit));

  const query = params.size ? `?${params}` : "";
  const raw = await get<
    Omit<NextResponse, "next_departures"> & { next_departures: Sections }
  >(`/next${query}`, fetchFn);

  return raw as NextResponse;
}
