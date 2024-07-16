import IconButtonWithTooltip from "@/components/icon-button-with-tooltip";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "@/components/ui/sheet";
import { ArrowRightFromLine } from "lucide-react";

function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButtonWithTooltip
          icon={<ArrowRightFromLine className="h-4 w-4" />}
          side="bottom"
          title="Expand"
        />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
