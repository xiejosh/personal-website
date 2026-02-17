"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";
// motion is still needed for the Waveform bars

interface Track {
  name: string;
  artist: string;
  isPlaying: boolean;
  timeAgo?: string;
}

const LASTFM_USER = "joshxie123";
const LASTFM_API_KEY = "d996489ef677e78cbe0f5d3d6611625f";

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function Waveform({ active }: { active: boolean }) {
  const bars = [0, 1, 2, 3, 4];
  const heights = [12, 18, 10, 20, 14];

  return (
    <div className="flex items-end gap-[3px]" style={{ height: 20 }}>
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ backgroundColor: "#1DB954" }}
          animate={
            active
              ? {
                  height: [heights[i] * 0.4, heights[i], heights[i] * 0.6, heights[i] * 0.9, heights[i] * 0.4],
                }
              : { height: heights[i] * 0.35 }
          }
          transition={
            active
              ? {
                  duration: 0.8 + i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.4 }
          }
        />
      ))}
    </div>
  );
}

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
        );
        const data = await res.json();
        const recent = data?.recenttracks?.track?.[0];
        if (!recent) return;

        const isPlaying = recent["@attr"]?.nowplaying === "true";
        const timestamp = recent.date?.uts ? parseInt(recent.date.uts) : 0;

        setTrack({
          name: recent.name,
          artist: recent.artist?.["#text"] ?? "",
          isPlaying,
          timeAgo: !isPlaying && timestamp ? getTimeAgo(timestamp) : undefined,
        });
      } catch {
        // silently fail
      }
    }

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!track) return null;

  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted/60">
        {track.isPlaying ? "I'm currently listening to" : "I last listened to"}
      </p>
      <div className="flex items-center gap-2.5">
        <FaSpotify size={16} className="shrink-0 text-[#1DB954]" />
        <Waveform active={track.isPlaying} />
        <p className="truncate text-sm text-muted">
          <span className="font-medium text-foreground">{track.name}</span>
          {" · "}
          {track.artist}
          {!track.isPlaying && track.timeAgo && (
            <span className="text-muted/50"> · {track.timeAgo}</span>
          )}
        </p>
      </div>
    </div>
  );
}
