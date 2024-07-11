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
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Song } from "@/data/db/schema";
import TypographyInlineCode from "@/components/TypographyInlineCode";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface RequestSongDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  song: Song;
  open?: boolean;
  children?: React.ReactNode;
}

const RequestSongDialog = ({
  className,
  song,
  open = false,
  children,
}: RequestSongDialogProps) => {
  const { toast } = useToast();
  const [isOpened, setIsOpened] = useState(open);

  function handleCopySong() {
    const copyText = `${song.artistId} - ${song.title}`;
    navigator.clipboard.writeText(copyText);
    toast({
      title: "Song copied to clipboard",
      description: <TypographyInlineCode>{copyText}</TypographyInlineCode>,
    });
  }

  function handleCopyRequestCommand() {
    const copyText = `!add ${song.artistId} - ${song.title}`;
    navigator.clipboard.writeText(copyText);
    toast({
      title: "Request command copied to clipboard",
      description: <TypographyInlineCode>{copyText}</TypographyInlineCode>,
    });
  }

  return (
    <Dialog open={isOpened} onOpenChange={(open) => setIsOpened(open)}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="secondary" className={cn("px-2", className)}>
            Request
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request song</DialogTitle>
          <DialogDescription>
            {song.artistId} - {song.title}
          </DialogDescription>
        </DialogHeader>
        <Separator orientation="horizontal" />
        {Number(song.price) > 0 && (
          <>
            <div>
              It’s a{" "}
              <strong className="border-b-2 border-destructive">
                paid song
              </strong>
              , priced at{" "}
              <strong className="border-b-2 border-destructive">{`$${song.price}`}</strong>{" "}
              or more.
            </div>
            <Separator orientation="horizontal" />
          </>
        )}
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
