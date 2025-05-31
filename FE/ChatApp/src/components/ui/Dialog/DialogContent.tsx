import { DialogPanel } from "@headlessui/react";
import { cn } from "@/lib/utils";

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <DialogPanel
      className={cn(
        "w-full max-w-md rounded-xl bg-white p-6 shadow-xl",
        className
      )}
    >
      {children}
    </DialogPanel>
  );
}
