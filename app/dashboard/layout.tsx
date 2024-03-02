"use client";

import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  PowerIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import { classNames } from "@/libs";
import { Navbar, Sidebar } from "@/components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div>
        <Sidebar {...{ toggle, setToggle }} />
        <div className="lg:pl-72">
          <Navbar {...{ toggle, setToggle }} />

          <main className="">
            <div className="p-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
