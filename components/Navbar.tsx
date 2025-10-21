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
import LanguageSwitcher from "./LanguageSwitcher";
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
      href: `/${lang}/about`,
      isNavLink: true,
    },
    {
      key: "signup",
      label: t.navbar.signup,
      href: `/${lang}/signup`,
      isDivider: true,
      isAuthLink: true,
    },
    { 
      key: "login", 
      label: t.navbar.login, 
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
          <Image
            src={FinScopeLogo}
            alt="FinScope"
            className="w-12 h-12 max-w-full max-h-full object-contain"
          />
          <p className="font-bold text-xl text-inherit hidden sm:block">
            {t.navbar.brand}
          </p>
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
        <NavbarItem isActive={isActive(`/${lang}/about`)}>
          <Link
            color={isActive(`/${lang}/about`) ? "primary" : "foreground"}
            href={`/${lang}/about`}
            aria-current={isActive(`/${lang}/about`) ? "page" : undefined}
          >
            {t.navbar.about}
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* Show Language Switcher on desktop (>= sm) */}
        <NavbarItem className="hidden md:flex">
          <LanguageSwitcher currentLang={lang} />
        </NavbarItem>
        {/* Show Login and Signup on desktop (>= sm) */}
        <NavbarItem className="flex">
          <Link href={`/${lang}`}>{t.navbar.login}</Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button as={Link} color="primary" href={`/${lang}`} variant="flat">
            {t.navbar.signup}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="pt-8">
        {/* Language Switcher in Mobile Menu */}
        <NavbarMenuItem className="mb-4">
          <LanguageSwitcher currentLang={lang} />
        </NavbarMenuItem>

        {/* Divider after Language Switcher */}
        <div className="mb-4 border-t border-gray-200 dark:border-gray-700" />

        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.key}-${index}`}>
            {item.isDivider && index > 0 && (
              <div className="my-3 border-t border-gray-200 dark:border-gray-700" />
            )}
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
      </NavbarMenu>
    </Navbar>
  );
}
