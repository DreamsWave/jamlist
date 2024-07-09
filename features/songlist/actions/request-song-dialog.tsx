import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Copy, Loader, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { type CreateSong, insertSongSchema, type Song } from "@/data/db/schema";
import { getSongAction, updateSongAction } from "@/server/actions/song";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { type DefaultValues, useForm } from "react-hook-form";

interface RequestSongDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  song: Song;
}

const RequestSongDialog = ({ className, song }: RequestSongDialogProps) => {
  const { toast } = useToast();

  function handleCopySong() {
    const copyText = `${song.artistId} - ${song.title}`;
    navigator.clipboard.writeText(copyText);
    toast({
      title: "Song copied to clipboard",
      description: copyText,
      action: <Check />,
    });
  }

  function handleCopyRequestCommand() {
    const copyText = `!add ${song.artistId} - ${song.title}`;
    navigator.clipboard.writeText(copyText);
    toast({
      title: "Request command copied to clipboard",
      description: copyText,
      action: <Check />,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="px-2">
          Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request song</DialogTitle>
          <DialogDescription>
            {song.artistId} - {song.title}
          </DialogDescription>
        </DialogHeader>
        <Button variant="outline" onClick={handleCopySong}>
          <Copy className="mr-2 h-4 w-4" /> Copy song
        </Button>
        <Button variant="outline" onClick={handleCopyRequestCommand}>
          <Copy className="mr-2 h-4 w-4" /> Copy request command
        </Button>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestSongDialog;
