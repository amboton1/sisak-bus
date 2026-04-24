# Sisak Bus

A SvelteKit web app that shows real-time bus departure information for the city of Sisak, Croatia.

## Features

- **Next departures** — home page shows the next 5 upcoming buses from each stop, auto-refreshing every 30 seconds
- **Full schedule** — browse the complete timetable by day type (weekday, Saturday, Sunday)
- **Four stops covered**
  - Polazak s kolodvora (from the bus station)
  - Polazak iz Željezare (from Željezara)
  - Kružna linija 5
  - Kružna linija 6
- **Countdown badges** — live countdown to the next departure on each row
- **Mobile-friendly** — responsive two-column grid on wider screens, single column on mobile

## Stack

- [SvelteKit](https://kit.svelte.dev/) (Svelte 5, TypeScript)
- [Vite](https://vitejs.dev/)
- FastAPI backend (separate repo, hosted on Railway) — serves schedule data via a REST API

## Project structure

```
src/
├── routes/
│   ├── +page.svelte              # Home — next departures
│   └── schedule/
│       ├── +page.server.ts       # Redirects to today's day tab
│       └── [day]/
│           ├── +page.server.ts   # Loads full schedule for a day
│           └── +page.svelte      # Full timetable view
├── lib/
│   ├── api/
│   │   ├── client.ts             # Base HTTP fetch wrapper
│   │   ├── schedule.ts           # Service layer (getSchedule, getNext)
│   │   └── types.ts              # Shared TypeScript types
│   ├── components/
│   │   ├── NextDepartures.svelte # Polling component for home page
│   │   ├── DayTabs.svelte        # Weekday / Saturday / Sunday tabs
│   │   ├── SectionTable.svelte   # One stop's departure table
│   │   ├── DepartureRow.svelte   # Single departure row
│   │   └── CountdownBadge.svelte # Live countdown display
│   └── utils/
│       ├── labels.ts             # Croatian display labels
│       └── time.ts               # Time helpers
```

## Getting started

### Prerequisites

- Node.js 20+
- A running instance of the backend API

### Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and set `PUBLIC_API_BASE` to your backend URL:

```env
PUBLIC_API_BASE=https://your-api.railway.app
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

## API endpoints used

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/schedule/{day}` | Full timetable for a day key (`radni_dan`, `subota`, `nedjelja`) |
| `GET` | `/next` | Next departures from now, with optional `from` and `limit` query params |

## Environment variables

| Variable | Description |
|----------|-------------|
| `PUBLIC_API_BASE` | Base URL of the FastAPI backend (no trailing slash) |
