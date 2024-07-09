import { Button } from "@/components/ui/button";
import type { Song } from "@/data/db/schema";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Check, Copy, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import DeleteSongDialog from "@/features/songlist/actions/delete-song-dialog";
import EditSongDialog from "@/features/songlist/actions/edit-song-dialog";
import { useToast } from "@/components/ui/use-toast";

interface DropDownMenuActionsProps {
  song: Song;
}

const DropDownMenuActions = ({ song }: DropDownMenuActionsProps) => {
  const [isEditSongDialogOpen, setIsEditSongDialogOpen] = useState(false);
  const [isDeleteSongDialogOpen, setIsDeleteSongDialogOpen] = useState(false);
  const { toast } = useToast();

  function handleCopy() {
    const copyText = `${song.artistId} - ${song.title}`;
    navigator.clipboard.writeText(copyText);
    toast({
      title: "Song copied to clipboard",
      description: copyText,
      action: <Check />,
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy song
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-yellow-600"
            onClick={() => setIsEditSongDialogOpen(true)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setIsDeleteSongDialogOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteSongDialog
        onOpenChange={(open) => setIsDeleteSongDialogOpen(open)}
        isOpen={isDeleteSongDialogOpen}
        songId={song.id}
      />
      <EditSongDialog
        onOpenChange={(open) => setIsEditSongDialogOpen(open)}
        isOpen={isEditSongDialogOpen}
        songId={song.id}
      />
    </>
  );
};

export default DropDownMenuActions;
