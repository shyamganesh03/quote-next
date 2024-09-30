import { cn } from "@/lib/utils/cn";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/lib/components/ui/button";
import { Menu } from "./menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "./sidebar-toggle";

import InvoiceLogo from "@/lib/assets/invoice.png";
import CampEdShortLogo from "@/lib/assets/CampEd-Short.svg";
import Image from "next/image";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <>
            <Image
              src={sidebar?.isOpen ? InvoiceLogo : CampEdShortLogo}
              alt={"Brand Image not found"}
              className={
                sidebar?.isOpen ? "h-14 w-[150px] ml-4" : "h-8 w-8 ml-4"
              }
              style={{
                transition: "all 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95)",
              }}
            />
          </>
        </Button>
        <Menu
          isOpen={sidebar?.isOpen}
          companyName={""}
          companyEmail={""}
          companyAbbreviation={""}
          userData={undefined}
        />
      </div>
    </aside>
  );
}
