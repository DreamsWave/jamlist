"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type React from "react";
import { useState, useTransition } from "react";
import { cn } from "@/utils/tailwind";
import { Loader, PlusCircle } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { type CreateSong, insertSongSchema } from "@/data/db/schema";
import { addSongAction } from "@/server/actions/song";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface AddSongDialogProps extends React.HTMLAttributes<HTMLFormElement> {
  className?: string;
}

function AddSongDialog({ className, ...props }: AddSongDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<CreateSong>({
    resolver: zodResolver(insertSongSchema),
    defaultValues: {
      title: "",
      artistId: "",
    },
  });

  function onSubmit(data: CreateSong) {
    startTransition(async () => {
      try {
        const addResult = await addSongAction({
          ...data,
        });
        if (addResult && addResult.status === "error") {
          toast({
            variant: "destructive",
            title: "Error",
            description: addResult.message,
          });
          return;
        }
      } catch (err) {
        console.error(err);
      }
    });
    form.reset();
    setIsOpen(false);
  }
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" /> Add song
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add song</DialogTitle>
          <DialogDescription>
            Fill in the song details and click the `Add` button to create the
            song.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-8", className)}
            {...props}
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
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddSongDialog;
