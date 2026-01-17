"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const photos = [
  "/photos/1.jpg",
  "/photos/2.jpg",
  "/photos/3.jpg",
  "/photos/4.jpg",
  "/photos/5.jpg",
  "/photos/6.jpg",
];

export default function HomePage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0">
        <div className="grid h-full w-full grid-cols-3 gap-6 p-8 opacity-60 blur-[1px]">
          {photos.map((src, i) => (
            <div
              key={i}
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-neutral-900
                shadow-2xl
              "
              style={{
                transform: `translateY(${(i % 3) * 20}px)`,
              }}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover scale-110"
              />
            </div>
          ))}
        </div>

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
      </div>

      {/* DECORATIVE SHAPES */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-purple-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[300px] w-[300px] rounded-full bg-cyan-400/30 blur-[120px]" />

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className="
            w-full max-w-sm
            rounded-2xl
            bg-white/10
            p-6
            backdrop-blur-xl
            shadow-2xl
            ring-1 ring-white/20
          "
        >
          <h1 className="mb-2 text-center text-3xl font-semibold text-white">
            Dudu Bubu VC
          </h1>
          <p className="mb-6 text-center text-sm text-white/70">
            High-quality video calls, instantly.
          </p>

          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="bubu"
            className="
              mb-4
              w-full
              rounded-lg
              bg-black/40
              px-4 py-3
              text-white
              placeholder-white/50
              outline-none
              ring-1 ring-white/20
              focus:ring-white/40
            "
          />

          <button
            disabled={!roomId}
            onClick={() => router.push(`/prejoin/${roomId}`)}
            className="
              w-full
              rounded-lg
              bg-white
              py-3
              font-medium
              text-black
              transition
              hover:bg-neutral-200
              disabled:opacity-50
            "
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
