"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  TrackToggle,
  DisconnectButton,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import VideoGrid from "./VideoGrid";

type Props = {
  roomId: string;
};

export default function RoomClient({ roomId }: Props) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchToken() {
      const res = await fetch(
        `/api/token?room=${roomId}&name=guest-${Date.now()}`
      );
      const data = await res.json();
      if (!mounted) return;
      setToken(data.token);
    }

    fetchToken();

    return () => {
      mounted = false;
    };
  }, [roomId]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-slate-400 text-sm">Connecting…</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect
      video
      audio
      className="
        h-screen w-screen
        bg-black
        flex flex-col
        safe-area
      "
    >
      {/* VIDEO AREA */}
      <main className="flex-1 flex items-center justify-center px-2">
        <VideoGrid />
      </main>

      {/* AUDIO (required, no UI) */}
      <RoomAudioRenderer />

      {/* BOTTOM CONTROLS */}
      <footer
        className="
          sticky bottom-0
          w-full
          flex items-center justify-center
          gap-4
          px-4 py-3
          bg-black/70
          backdrop-blur
        "
      >
        {/* MIC */}
        <TrackToggle
          source={Track.Source.Microphone}
          className="
            rounded-full
            bg-neutral-800
            p-3
            text-white
            hover:bg-neutral-700
            active:scale-95
            transition
            data-[enabled=false]:bg-red-600
          "
        />

        {/* CAMERA */}
        <TrackToggle
          source={Track.Source.Camera}
          className="
            rounded-full
            bg-neutral-800
            p-3
            text-white
            hover:bg-neutral-700
            active:scale-95
            transition
            data-[enabled=false]:bg-red-600
          "
        />

        {/* LEAVE */}
        <DisconnectButton
          className="
            px-6 py-3
            rounded-full
            text-white
            text-sm
            font-medium
            bg-red-600
            hover:bg-red-700
            active:scale-95
            transition
          "
        >
          Leave
        </DisconnectButton>
      </footer>
    </LiveKitRoom>
  );
}
