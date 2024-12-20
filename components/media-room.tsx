"use client";

import { User } from "next-auth";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

interface MediaRoomProps {
  chatId: string;
  audio: boolean;
  video: boolean;
  user: User | undefined;
}

export function MediaRoom({ chatId, audio, video, user }: MediaRoomProps) {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    const name = `${user?.name}-${user?.email}`;

    (async () => {
      try {
        const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await res.json();

        setToken(data.token);
      } catch (error) {
        console.error("[MediaRoom]", error);
      }
    })();
  }, [chatId, user]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2
          className="animate-spin h-7 w-7 text-zinc-500 my-4"
          size={48}
        />
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
