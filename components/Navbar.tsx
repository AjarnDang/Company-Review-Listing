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

interface NavbarProps {
  lang: Locale;
}

export default function App({ lang }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const t = getDictionary(lang);

  const menuItems = [
    { key: "profile", label: t.menu.profile },
    { key: "dashboard", label: t.menu.dashboard },
    { key: "activity", label: t.menu.activity },
    { key: "analytics", label: t.menu.analytics },
    { key: "system", label: t.menu.system },
    { key: "deployments", label: t.menu.deployments },
    { key: "mySettings", label: t.menu.mySettings },
    { key: "teamSettings", label: t.menu.teamSettings },
    { key: "helpFeedback", label: t.menu.helpFeedback },
    { key: "logout", label: t.menu.logout },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="h-20">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? t.menu.closeMenu : t.menu.openMenu}
          className="sm:hidden"
        />
        <NavbarBrand className="flex items-center gap-2">
          <Image src={FinScopeLogo} alt="FinScope" className="w-12 h-12 max-w-full max-h-full object-contain" />
          <p className="font-bold text-xl text-inherit">{t.navbar.brand}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href={`/${lang}`}>
            {t.navbar.home}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={`/${lang}/companies`}>
            {t.navbar.companies}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={`/${lang}/about`}>
            {t.navbar.about}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <LanguageSwitcher currentLang={lang} />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href={`/${lang}`}>{t.navbar.login}</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href={`/${lang}`} variant="flat">
            {t.navbar.signup}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.key}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={`/${lang}`}
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
