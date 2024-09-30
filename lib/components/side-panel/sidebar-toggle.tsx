import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils/cn";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible lg:visible absolute bottom-[18%] -right-[12px] z-20">
      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700 cursor-pointer text-background",
            isOpen === false ? "rotate-180" : "rotate-0",
          )}
          onClick={() => setIsOpen?.()}
        />
      </div>
    </div>
  );
}
