// components/Dialog.js
import { Dialog as HeadlessDialog } from "@headlessui/react";
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}
export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <HeadlessDialog
      open={open}
      onClose={onOpenChange}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {children}
      </div>
    </HeadlessDialog>
  );
}
