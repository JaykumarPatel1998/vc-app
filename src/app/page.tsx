"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* SINGLE BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/photos/2.JPG" // your background photo
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* FOREGROUND CARD (transparent) */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="w-full max-w-sm rounded-2xl bg-grey/10 p-6 shadow-none ring-0">
          <h1 className="mb-2 text-center text-3xl font-semibold text-white">
            Dudu Bubu VC
          </h1>
          <p className="mb-6 text-center text-sm text-white/70">
            High-quality video calls, instantly.
          </p>

          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
            className="mb-4 w-full rounded-lg bg-black/30 px-4 py-3 text-white placeholder-white outline-none ring-1 ring-white/20 focus:ring-white/40"
          />

          <button
            disabled={!roomId}
            onClick={() => router.push(`/prejoin/${roomId}`)}
            className="w-full rounded-lg bg-white py-3 font-medium text-black transition hover:bg-white disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
