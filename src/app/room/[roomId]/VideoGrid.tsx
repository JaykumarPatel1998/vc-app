"use client";

import {
  useTracks,
  TrackReferenceOrPlaceholder,
  GridLayout,
  ParticipantTile,
  ParticipantName,
  ConnectionQualityIndicator,
  VideoTrack,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export default function VideoGrid() {
  const tracks: TrackReferenceOrPlaceholder[] = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
  ]);

  return (
    <div className="h-full w-full bg-neutral-950 p-4">
      <GridLayout
        tracks={tracks}
        className="
          h-full
          gap-4
          auto-rows-fr
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        <ParticipantTile
          className="
            relative
            overflow-hidden
            rounded-2xl
            bg-neutral-900
            shadow-lg
          "
        >
          {/* Video */}
          <VideoTrack className="h-full w-full object-cover" />

          {/* Top-right connection quality */}
          <div className="absolute right-2 top-2 z-10">
            <ConnectionQualityIndicator />
          </div>

          {/* Bottom gradient overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Participant name */}
          <div className="absolute bottom-2 left-3 z-10 text-sm font-medium text-white">
            <ParticipantName />
          </div>

          
        </ParticipantTile>
      </GridLayout>
    </div>
  );
}
