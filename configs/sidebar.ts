import { Icons } from "@/components";
import { sidebarInterface } from "@/types/ui/sidebar";

export const navItems: sidebarInterface[] = [
  // {
  //   name: "Dashboard",
  //   icon: Icons.Dashboard,
  //   link: "",
  // },
  {
    name: "Inventory",
    icon: Icons.Inventory,
    link: "/dashboard/inventory",
  },
  {
    name: "Orders",
    icon: Icons.Orders,
    link: "/dashboard/orders",
  },
  {
    name: "Team",
    icon: Icons.Team,
    link: "/dashboard/team",
  },
];
