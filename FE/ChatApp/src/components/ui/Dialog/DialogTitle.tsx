import { DialogTitle as HeadlessDialog } from "@headlessui/react";

import type { ReactNode } from "react";

export function DialogTitle({ children }: { children: ReactNode }) {
  return (
    <HeadlessDialog className="text-xl font-semibold text-gray-900">
      {children}
    </HeadlessDialog>
  );
}
