import { Button } from "@/components/ui/button";
import type * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { cn } from "@/utils/tailwind";
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
import { useEffect, useTransition } from "react";
import { type DefaultValues, useForm } from "react-hook-form";

interface EditSongDialogProps
  extends DialogPrimitive.DialogContentProps,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  songId: Song["id"];
}

const EditSongDialog = ({
  className,
  isOpen = false,
  onOpenChange,
  songId,
}: EditSongDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<CreateSong>({
    resolver: zodResolver(insertSongSchema),
    defaultValues: {
      title: "",
      artistId: "",
    },
  });

  useEffect(() => {
    async function getSong() {
      try {
        const song = await getSongAction({ id: songId });
        form.reset({ ...song } as DefaultValues<Song>);
      } catch (err) {
        console.error(err);
      }
    }
    if (isOpen) {
      getSong();
    }
  }, [songId, isOpen, form]);

  function onSubmit(data: CreateSong) {
    startTransition(async () => {
      try {
        const updateResult = await updateSongAction({
          ...data,
          id: songId,
        });
        toast({
          variant: "default",
          title: "Song updated",
        });
      } catch (err) {
        console.error(err);
      }
    });
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit song</DialogTitle>
          <DialogDescription>
            Make changes to the song here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-8", className)}
            // {...props}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artistId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist ID</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Loader
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSongDialog;
