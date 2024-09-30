"use client";

import { cn } from "@/lib/utils/cn";
import { useStore } from "@/hooks/use-store";
import { Sidebar } from "./sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function SidePanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar: any = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "bg-zinc-50 dark:bg-zinc-900 ease-in-out duration-150 bg-background h-screen hide-scrollbar",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        {children}
      </main>
    </>
  );
}
