import {
  LucideIcon,
  ListOrdered,
  UsersRound,
  Box,
  Boxes,
  ReceiptText,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/quotes",
          label: `Quotes`,
          active: /\/quotes?/.test(pathname),
          icon: ListOrdered,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/customers",
          label: `Customers`,
          active: /\/customers?/.test(pathname),
          icon: UsersRound,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/items",
          label: `Items`,
          active: /\/items?/.test(pathname),
          icon: Box,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/item-group",
          label: `Item Group`,
          active: /\/item-group/.test(pathname),
          icon: Boxes,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/invoices",
          label: `Invoices`,
          active: /\/invoices?/.test(pathname),
          icon: ReceiptText,
          submenus: [],
        },
      ],
    },
  ];
}
