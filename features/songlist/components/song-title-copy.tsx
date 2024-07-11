"use client";

import { Copy } from "lucide-react";
import TypographyInlineCode from "@/components/TypographyInlineCode";
import { useToast } from "@/components/ui/use-toast";
import RequestSongDialog from "@/features/songlist/components/request-song-dialog-button";
import type { Song } from "@/data/db/schema";
import React from "react";

interface SongTitleCopyProps {
  song: Song;
  children: string;
}

function SongTitleCopy({ song, children }: SongTitleCopyProps) {
  const { toast } = useToast();

  function copyToClipboard() {
    const copyText = String(children);
    navigator.clipboard.writeText(copyText);
    toast({
      title: "Song copied to clipboard",
      description: <TypographyInlineCode>{copyText}</TypographyInlineCode>,
    });
  }

  return (
    <>
      <RequestSongDialog song={song}>
        {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
        <a className="group relative line-clamp-2 inline-flex cursor-pointer pl-5 leading-4 hover:underline md:hidden">
          {children}
        </a>
      </RequestSongDialog>
      <a
        className="group relative line-clamp-2 hidden cursor-pointer pl-5 leading-4 hover:underline md:inline-flex"
        // biome-ignore lint/a11y/useValidAnchor: <explanation>
        onClick={copyToClipboard}
      >
        {children}
        <Copy className="absolute left-0 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:flex" />
      </a>
    </>
  );
}

export default SongTitleCopy;
