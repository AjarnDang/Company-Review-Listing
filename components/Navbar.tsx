"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/get-dictionary";
import LanguageSwitcherWrapper from "./lang/LanguageSwitcherWrapper";
import Image from "next/image";
import FinScopeLogo from "@/public/logo/FinScopeLogo.png";
import { usePathname } from "next/navigation";

interface NavbarProps {
  lang: Locale;
}

export default function App({ lang }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const t = getDictionary(lang);

  const isActive = (path: string) => {
    if (path === `/${lang}`) {
      return pathname === `/${lang}`;
    }
    return pathname?.startsWith(path);
  };

  const menuItems = [
    { 
      key: "home", 
      label: t.navbar.home, 
      href: `/${lang}`, 
      isNavLink: true,
    },
    {
      key: "companies",
      label: t.navbar.companies,
      href: `/${lang}/companies`,
      isNavLink: true,
    },
    {
      key: "about",
      label: t.navbar.about,
      href: `/${lang}`,
      isNavLink: true,
    },
    {
      key: "getStarted",
      label: t.navbar.getStarted,
      href: `/${lang}`,
      isAuthLink: true,
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="h-20">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t.menu.closeMenu : t.menu.openMenu}
          className="md:hidden"
        />
        <NavbarBrand className="flex items-center gap-2">
          <Link
            color={isActive(`/${lang}`) ? "primary" : "foreground"}
            href={`/${lang}`}
            aria-current={isActive(`/${lang}`) ? "page" : undefined}
          >
          <Image
            src={FinScopeLogo}
            alt="FinScope"
            className="w-12 h-12 max-w-full max-h-full object-contain"
          />
          <p className="font-bold text-xl text-inherit hidden sm:block">
            {t.navbar.brand}
          </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem isActive={isActive(`/${lang}`)}>
          <Link
            color={isActive(`/${lang}`) ? "primary" : "foreground"}
            href={`/${lang}`}
            aria-current={isActive(`/${lang}`) ? "page" : undefined}
          >
            {t.navbar.home}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive(`/${lang}/companies`)}>
          <Link
            color={isActive(`/${lang}/companies`) ? "primary" : "foreground"}
            href={`/${lang}/companies`}
            aria-current={isActive(`/${lang}/companies`) ? "page" : undefined}
          >
            {t.navbar.companies}
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive(`/${lang}`)}>
          <Link
            color={isActive(`/${lang}`) ? "primary" : "foreground"}
            href={`/${lang}`}
            aria-current={isActive(`/${lang}`) ? "page" : undefined}
          >
            {t.navbar.about}
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* Show Language Switcher on desktop (>= md) */}
        <NavbarItem className="hidden md:flex">
          <LanguageSwitcherWrapper currentLang={lang} />
        </NavbarItem>
        {/* Show Get Started button */}
        <NavbarItem>
          <Button 
            as={Link} 
            color="primary" 
            href={`/${lang}`} 
            variant="flat"
            className="font-semibold"
          >
            {t.navbar.getStarted}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-8">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.key}-${index}`}>
            <Link
              className="w-full py-3"
              color={
                !item.isAuthLink && isActive(item.href)
                  ? "primary"
                  : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <div className="my-3 border-t border-gray-200 dark:border-gray-700" />
        <NavbarMenuItem className="mt-4">
          <LanguageSwitcherWrapper currentLang={lang} />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
