"use client";

import Link from "next/link";
import { Ellipsis, LogOutIcon, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";
import { getMenuList } from "@/constants/menu-list";
import { Button } from "@/lib/components/ui/button";
import { ScrollArea } from "@/lib/components/ui/scroll-area";
import { CollapseMenuButton } from "./collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/lib/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRouter } from "next/navigation";

interface MenuProps {
  isOpen: boolean | undefined;
  companyName: string;
  companyEmail: string;
  companyAbbreviation: string;
  userData: any;
}

const SettingsOption = ({
  label,
  icon: IconComponent,
  onClick,
  className = "",
}: any) => (
  <div
    className={cn(
      "flex justify-between items-center hover:bg-muted cursor-pointer p-4 py-2 group",
      className,
    )}
    onClick={onClick}
  >
    <p className="text-sm text-muted-foreground group-hover:text-black ">
      {label}
    </p>
    <IconComponent className="inline h-5 w-5" />
  </div>
);

export function Menu({
  isOpen = false,
  companyName,
  companyEmail,
  companyAbbreviation,
  userData,
}: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await logout();
      sessionStorage.clear();
      localStorage.clear();
      router.push("/login");
    } catch (error: any) {
      const httpStatus = error?.httpStatus;
      const exception = error?.exception;
      if (
        httpStatus === 401 ||
        exception === "frappe.exceptions.AuthenticationError"
      ) {
        console.warn("Session expired. Proceeding with local logout.");
        router.push("/login");
      } else {
        console.error("Failed to logout:", error);
      }
    }
  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={"ghost"}
                              className={`justify-start ml-1 py-0 gap-4 text-input ${
                                active ? "bg-secondary" : ""
                              }`}
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100",
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  ),
              )}
            </li>
          ))}
          <li className="w-full grow flex flex-col justify-send place-content-end pb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={`justify-start ml-2 py-0 px-2 w-full gap-4 hover:text-primary mt-2 ${
                    !isOpen ? "w-[45px]" : "w-[85%]"
                  }`}
                  type="button"
                >
                  {userData?.user_image ? (
                    <Avatar>
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_FRAPPE_URL}${
                          userData?.user_image
                        }`}
                        alt={"User profile image not found"}
                      />
                      <AvatarFallback>
                        {companyAbbreviation || ""}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <span
                      className={`relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full`}
                    >
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-primary text-secondary">
                        {companyAbbreviation || ""}
                      </span>
                    </span>
                  )}
                  <p
                    className={cn(
                      "truncate text-sm",
                      "max-w-[200px] ",
                      isOpen === false
                        ? "-translate-x-96 opacity-0"
                        : "translate-x-0 opacity-100",
                    )}
                  >
                    {`My Account`}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent className={`w-full mr-10 p-0 pb-2 ml-6`}>
                <div className="pt-4">
                  <h4 className="text-base font-semibold leading-none pl-4 ">
                    {`Hi,`} {companyName || ""}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2 mb-4 pl-4 truncate">
                    {companyEmail || ""}
                  </p>

                  <SettingsOption
                    label={`Account Settings`}
                    icon={Settings}
                    onClick={() => router.push("/settings/general")}
                  />

                  <SettingsOption
                    label={`Log Out`}
                    icon={LogOutIcon}
                    onClick={handleLogout}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
