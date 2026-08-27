"use client";

import { useEffect, useState } from "react";
import { BootReveal } from "./Boot";

// Publishable key — safe to ship to the client. Writes only happen through the
// record_visit() RPC (security definer); the table itself is read-only under RLS.
const SUPABASE_URL = "https://cypaaqbtpubcccppipmf.supabase.co";
const SUPABASE_KEY = "sb_publishable_kk8sLnjv1-Kljw2oJZr7KQ_uwW_RKXL";
const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

const DAYS = 6;
const BAR_WIDTH = 8;
const DAY_MS = 86_400_000;

// Days are bucketed by UTC date, matching record_visit() on the server.
function utcDay(offsetFromToday: number) {
  return new Date(Date.now() - offsetFromToday * DAY_MS).toISOString().slice(0, 10);
}

function dayLabel(day: string) {
  return new Date(`${day}T00:00:00Z`)
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", timeZone: "UTC" })
    .toLowerCase();
}

/** Records one visit per browser session. Mounted once in the root layout. */
export function VisitTracker() {
  useEffect(() => {
    try {
      const { hostname } = window.location;
      if (hostname === "localhost" || hostname === "127.0.0.1") return;
      if (sessionStorage.getItem("visit-recorded")) return;
      sessionStorage.setItem("visit-recorded", "1");
    } catch {
      return;
    }
    fetch(`${SUPABASE_URL}/rest/v1/rpc/record_visit`, {
      method: "POST",
      headers: { ...HEADERS, "Content-Type": "application/json" },
      body: "{}",
    }).catch(() => {});
  }, []);

  return null;
}

interface DayCount {
  day: string;
  count: number;
}

/** Two-column ASCII bar chart of the past 6 days of visits. Renders nothing until data arrives. */
export function VisitorChart({ delay = 0 }: { delay?: number }) {
  const [days, setDays] = useState<DayCount[] | null>(null);

  useEffect(() => {
    fetch(
      `${SUPABASE_URL}/rest/v1/daily_visits?select=day,count&day=gte.${utcDay(DAYS - 1)}&order=day.asc`,
      { headers: HEADERS },
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((rows: DayCount[]) => {
        const byDay = new Map(rows.map((row) => [row.day, row.count]));
        setDays(
          Array.from({ length: DAYS }, (_, i) => {
            const day = utcDay(DAYS - 1 - i);
            return { day, count: byDay.get(day) ?? 0 };
          }),
        );
      })
      .catch(() => setDays(null));
  }, []);

  if (!days) return null;

  const max = Math.max(1, ...days.map((d) => d.count));
  const total = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <BootReveal
      delay={delay}
      className="mt-4 overflow-hidden rounded-lg border border-card-border bg-background/70 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 border-b border-card-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-muted">visitors.log</span>
      </div>
      <div className="p-4 text-[11px] leading-relaxed">
        <p className="mb-1 text-accent">$ tail -n {DAYS} visitors.log</p>
        <div className="flex gap-6">
          {[days.slice(0, DAYS / 2), days.slice(DAYS / 2)].map((column) => (
            <div key={column[0].day}>
              {column.map(({ day, count }) => {
                const bar = "#".repeat(
                  Math.max(count > 0 ? 1 : 0, Math.round((count / max) * BAR_WIDTH)),
                );
                const isToday = day === utcDay(0);
                return (
                  <p
                    key={day}
                    className={`whitespace-pre ${isToday ? "text-foreground" : "text-muted"}`}
                  >
                    [{dayLabel(day)}] <span className="text-accent">{bar}</span>
                    {bar ? " " : ""}
                    {count}
                  </p>
                );
              })}
            </div>
          ))}
        </div>
        <p className="mt-1 text-muted/70">&gt; {total} visitors in the last {DAYS} days</p>
      </div>
    </BootReveal>
  );
}
