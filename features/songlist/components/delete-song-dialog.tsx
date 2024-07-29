import { Button } from "@/components/ui/button";
import type * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { cn } from "@/utils/tailwind";
import type { Song } from "@/data/db/schema";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { deleteSongAction } from "@/server/actions/song";

interface DeleteSongDialogProps
  extends DialogPrimitive.DialogContentProps,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  songId: Song["id"];
}

const DeleteSongDialog = ({
  className,
  isOpen = false,
  onOpenChange,
  songId,
  ...props
}: DeleteSongDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSongDelete = () => {
    startTransition(async () => {
      try {
        await deleteSongAction({ id: songId });
      } catch (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Error",
          description: `${err}`,
        });
      } finally {
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={cn(className)} {...props}>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            song.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSongDelete}
            disabled={isPending}
          >
            {isPending && (
              <Loader
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSongDialog;
