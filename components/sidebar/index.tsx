import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { classNames } from "@/libs";
import { Icons } from "..";
import { routes } from "@/routes";

const navigation = [
  // {
  //   name: "Dashboard",
  //   href: "/dashboard/overview",
  //   icon: HomeIcon,
  //   current: true,
  // },
  {
    name: "Inventory",
    href: routes.inventory.index,
    icon: Icons.Inventory,
    current: false,
  },
  {
    name: "Orders",
    href: routes.orders.index,
    icon: Icons.Orders,
    current: false,
  },
  // { name: "Team", href: "/dashboard/team", icon: UsersIcon, current: false },
];

export const Sidebar = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: (t: boolean) => void;
}) => {
  const pathname = usePathname();

  const handleActive = (link: string) => {
    return pathname.startsWith(link);
  };

  return (
    <>
      <div>
        <Transition.Root show={toggle} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setToggle}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-neutral-gray/50" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Side {...{ handleActive }} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <Side {...{ handleActive }} />
        </div>
      </div>
    </>
  );
};

const Side = ({ handleActive }: { handleActive: (key: string) => boolean }) => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-neutral-gray px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          src={"/img/logo-long.png"}
          alt={"HX logo"}
          width={232}
          height={48}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
          priority
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, i) => (
                <NavItem key={i} {...{ item, handleActive }} />
              ))}
            </ul>
          </li>
          {/* <li className="mt-auto">
            <a
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
            >
              <Cog6ToothIcon
                className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                aria-hidden="true"
              />
              Settings
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({
  item,
  handleActive,
}: {
  item: any;
  handleActive: (key: string) => boolean;
}) => {
  return (
    <li key={item.name}>
      <a
        href={item.href}
        className={classNames(
          handleActive(item.href)
            ? "text-primary"
            : "text-neutral-40 dark:text-neutral-30",
          "text-sm leading-6 font-semibold",
          "group hover:text-primary",
          "flex items-center gap-x-3",
          "rounded-md p-2"
        )}
      >
        <item.icon
          className={classNames("h-8 w-8 shrink-0", "group-hover:text-primary")}
          aria-hidden="true"
        />
        {item.name}
      </a>
    </li>
  );
};
