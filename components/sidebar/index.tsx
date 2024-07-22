import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { classNames } from "@/libs";
import { Icons } from "..";
import { routes } from "@/routes";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Inventory",
    icon: Icons.Inventory,
    current: false,
    subNav: [
      {
        name: "Products",
        href: routes.inventory.products,
      },
      {
        name: "Categories",
        href: routes.inventory.categories,
      },
    ],
  },
  {
    name: "Orders",
    href: routes.orders.index,
    icon: Icons.Orders,
    current: false,
  },
  {
    name: "Announcements",
    href: routes.announcements.index,
    icon: Icons.Bullhorn,
    current: false,
  },
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
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-neutral-gray/50" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Side {...{ handleActive }} />
                </DialogPanel>
              </TransitionChild>
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
                <div key={i}>
                  {item.subNav ? (
                    <NavItem key={i} {...{ item, handleActive }} />
                  ) : (
                    <Link
                      href={item.href || ""}
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
                        className={classNames(
                          "h-8 w-8 shrink-0",
                          "group-hover:text-primary"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </ul>
          </li>
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
  const [toggle, setToggle] = useState(() => handleActive(item.href));

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setToggle(!toggle);
        }}
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
        <span>
          <item.icon
            className={classNames(
              "h-8 w-8 shrink-0",
              "group-hover:text-primary"
            )}
            aria-hidden="true"
          />
        </span>
        <div className="flex items-center gap-1">
          {item.name}
          <ChevronDownIcon className="w-3 h-3" />
        </div>
      </button>

      <motion.div
        className="overflow-hidden"
        initial={{ height: "auto", opacity: 1 }}
        animate={{ height: toggle ? "auto" : 0, opacity: toggle ? 1 : 0 }}
      >
        {item.subNav?.map(
          ({ name, href }: { name: string; href: string }, key: number) => (
            <Fragment key={key}>
              <Link
                href={href}
                className={classNames(
                  "px-2",
                  "rounded-lg",
                  "flex gap-4 items-center",
                  handleActive(href)
                    ? "text-primary bg-primary/10"
                    : "text-neutral-40 dark:text-neutral-30"
                )}
              >
                <span className="flex items-center justify-center flex-[0_0_20px] h-10 relative">
                  {key !== 0 && (
                    <span className="w-[2px] bg-neutral-100 dark:bg-neutral-50 h-5 absolute top-0" />
                  )}

                  <span
                    className={classNames(
                      "w-[6px] h-[6px]",
                      "rounded-full absolute z-[1]",
                      handleActive(href)
                        ? "bg-primary"
                        : "bg-neutral-200 dark:bg-neutral-50"
                    )}
                  />

                  {key + 1 !== item.subNav.length && (
                    <span className="w-[2px] bg-neutral-100 dark:bg-neutral-50 h-5 absolute bottom-0" />
                  )}
                </span>
                <p className="text-sm font-medium">{name}</p>
              </Link>
            </Fragment>
          )
        )}
      </motion.div>
    </div>
  );
};
