import { useDialogStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui";

interface ModalWrapperProps {
  title: string;
  children: React.ReactNode;
}
export const ModalWrapper = ({ title, children }: ModalWrapperProps) => {
    const { isOpen, closeDialog } = useDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
