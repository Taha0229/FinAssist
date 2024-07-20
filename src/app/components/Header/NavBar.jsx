"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { usePathname, useRouter } from "next/navigation.js";
import Image from "next/image.js";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Chat",
      link: "/",
    },
    {
      name: "Github",
      link: "/about",
    },
    {
      name: "Documentation",
      link: "/products",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand onClick={() => router.push("/")} className="cursor-pointer md:space-x-2" >
          {/* <Image src={"/images/main_logo.png"} alt="logo" width={50} height={50}/> */}
          <AcmeLogo/>
          <p className="font-bold text-inherit text-pretty text-center">FinAssist</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item, index) => {
          if (item.link === pathname) {
            return (
              <NavbarItem isActive key={index}>
                <Link href={item.link}>{item.name}</Link>
              </NavbarItem>
            );
          } else {
            return (
              <NavbarItem key={index}>
                <Link color="foreground" href={item.link}>
                  {item.name}
                </Link>
              </NavbarItem>
            );
          }
        })}
      </NavbarContent>
      
      <NavbarMenu>
      {navItems.map((item, index) => {
          if (item.link === pathname) {
            return (
              <NavbarMenuItem isActive key={index}>
                <Link href={item.link}>{item.name}</Link>
              </NavbarMenuItem>
            );
          } else {
            return (
              <NavbarMenuItem key={index}>
                <Link color="foreground" href={item.link}>
                  {item.name}
                </Link>
              </NavbarMenuItem>
            );
          }
        })}
      </NavbarMenu>
    </Navbar>
  );
}
