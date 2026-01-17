"use client";

import { PreJoin } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const date = Date.now();

export default function PreJoinPage({
  params,
}: {
  params: { roomId: string };
}) {
  const router = useRouter();

  // Generate a stable default username once
  const defaultUsername = useMemo(() => `guest-${date})}`, []);

  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-purple-500/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 h-[300px] w-[300px] rounded-full bg-cyan-400/30 blur-[140px]" />

      {/* PREJOIN CARD */}
      <div
        className="
          relative z-10
          w-full max-w-md
          rounded-2xl
          bg-white/10
          backdrop-blur-xl
          shadow-2xl
          ring-1 ring-white/20
          p-6
        "
      >
        <h2 className="mb-2 text-center text-2xl font-semibold text-white">
          Ready to join?
        </h2>

        <p className="mb-6 text-center text-sm text-white/70">
          Check your camera and microphone before entering.
        </p>

        <PreJoin
          defaults={{
            username: defaultUsername,
            videoEnabled: true,
            audioEnabled: true,
          }}
          className="
            [&_.lk-prejoin-video]:rounded-xl
            [&_.lk-prejoin-video]:overflow-hidden
            [&_.lk-prejoin-video]:bg-black

            [&_.lk-prejoin-input]:bg-black/40
            [&_.lk-prejoin-input]:text-white
            [&_.lk-prejoin-input]:rounded-lg
            [&_.lk-prejoin-input]:ring-1
            [&_.lk-prejoin-input]:ring-white/20
            [&_.lk-prejoin-input]:focus:ring-white/40

            [&_.lk-prejoin-controls]:mt-4

            [&_.lk-prejoin-button]:bg-white
            [&_.lk-prejoin-button]:text-black
            [&_.lk-prejoin-button]:rounded-lg
            [&_.lk-prejoin-button]:font-medium
            [&_.lk-prejoin-button]:hover:bg-neutral-200
          "
          onSubmit={(values) => {
            router.push(`/room/demo-room`);
          }}
        />
      </div>
    </main>
  );
}
