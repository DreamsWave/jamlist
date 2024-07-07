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
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import DeleteSongDialog from "./delete-song-dialog";
import EditSongDialog from "./edit-song-dialog";

interface DropDownMenuActionsProps {
  song: Song;
}

const DropDownMenuActions = ({ song }: DropDownMenuActionsProps) => {
  const [isEditSongDialogOpen, setIsEditSongDialogOpen] = useState(false);
  const [isDeleteSongDialogOpen, setIsDeleteSongDialogOpen] = useState(false);

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
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(String(song.id))}
          >
            Copy payment ID
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
