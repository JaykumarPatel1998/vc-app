"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";

const number = Math.floor(Math.random() * 10000)
export default function PreJoinPage({ params }: { params: { roomId: string } }) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [username, setUsername] = useState("");

  // Stable default username
  const defaultUsername = useMemo(() => `guest-${number}`, []);
  useEffect(() => {
    setUsername(defaultUsername);
  }, [defaultUsername]);

  // Setup camera preview
  useEffect(() => {
    let stream: MediaStream;
    async function startPreview() {
      if (videoEnabled && videoRef.current) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    }

    if (videoEnabled) startPreview();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [videoEnabled]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/photos/5.JPG"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Foreground card */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/0 p-6 flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold text-white text-center">
            Ready to join?
          </h2>
          <p className="text-sm text-white/70 text-center">
            Check your camera and microphone before entering.
          </p>

          {/* Video Preview */}
          {videoEnabled && (
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
              <video ref={videoRef} className="w-full h-full object-cover" muted />
            </div>
          )}

          {/* Username input */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-lg bg-black/30 px-4 py-3 text-white placeholder-white/50 outline-none ring-1 ring-white/20 focus:ring-white/40"
          />

          {/* Controls */}
          <div className="flex gap-4 w-full justify-center">
            <button
              onClick={() => setVideoEnabled((v) => !v)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                videoEnabled ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {videoEnabled ? "Camera Off" : "Camera On"}
            </button>
            <button
              onClick={() => setAudioEnabled((a) => !a)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                audioEnabled ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {audioEnabled ? "Mic Off" : "Mic On"}
            </button>
          </div>

          {/* Join button */}
          <button
            onClick={() =>
              router.push(
                `/room/demo-room`
              )
            }
            className="mt-4 w-full rounded-lg bg-white py-3 font-medium text-black transition hover:bg-white/40"
          >
            Join Call
          </button>
        </div>
      </div>
    </div>
  );
}
