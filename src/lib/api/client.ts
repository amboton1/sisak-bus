import { PUBLIC_API_BASE } from '$env/static/public';

export class ApiError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
		this.name = 'ApiError';
	}
}

export async function get<T>(path: string, fetchFn: typeof fetch = fetch): Promise<T> {
	const url = `${PUBLIC_API_BASE}${path}`;
	const res = await fetchFn(url);

	if (!res.ok) {
		throw new ApiError(res.status, `API error ${res.status} for ${path}`);
	}

	return res.json() as Promise<T>;
}
