"use client";

import { useState } from "react";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constans";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { Navbar, NavbarMenuToggle } from "@heroui/navbar";

interface PropTypes {
  children: React.ReactNode;
  type?: string;
  description?: string;
  title?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, type = "admin", description, title } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex max-w-screen-3xl 3xl:container">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />
        <div className="w-full h-screen p-8 overflow-y-auto">
          <Navbar
            className="flex justify-between px-0 bg-transparent"
            isBlurred={false}
            position="static"
            classNames={{ wrapper: "p-0" }}
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            ></NavbarMenuToggle>
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
