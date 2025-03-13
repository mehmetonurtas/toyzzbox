"use client"

import React, { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  ShoppingBag, 
  Users, 
  Settings, 
  HelpCircle,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";


// Menü öğeleri
const menuItems = [
  {
    title: "Ana Sayfa",
    icon: Home,
    href: "/",
    submenu: false,
  },
  {
    title: "Ürünler",
    icon: ShoppingBag,
    submenu: true,
    items: [
      { title: "Tüm Ürünler", href: "/products" },
      { title: "Kategoriler", href: "/products/categories" },
      { title: "Stok Yönetimi", href: "/products/inventory" },
    ],
  },
  {
    title: "Kullanıcılar",
    icon: Users,
    submenu: true,
    items: [
      { title: "Tüm Kullanıcılar", href: "/users" },
      { title: "Kullanıcı Grupları", href: "/users/groups" },
      { title: "İzinler", href: "/users/permissions" },
    ],
  },
  {
    title: "Ayarlar",
    icon: Settings,
    href: "/settings",
    submenu: false,
  },
  {
    title: "Yardım",
    icon: HelpCircle,
    href: "/help",
    submenu: false,
  }
];

const MenuItem = ({ item, isActive }) => {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  if (!item.submenu) {
    return (
      <Link 
        href={item.href} 
        className={cn(
          "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
          isActive 
            ? "bg-accent text-accent-foreground" 
            : "hover:bg-accent/50 hover:text-accent-foreground"
        )}
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{item.title}</span>
      </Link>
    );
  }

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="w-full space-y-1"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-3 rounded-md text-sm font-medium hover:bg-accent/50 transition-colors">
        <div className="flex items-center">
          <Icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </div>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-9 space-y-1">
        {item.items.map((subItem, index) => (
          <Link
            key={index}
            href={subItem.href}
            className="block py-2 px-2 rounded-md text-sm hover:bg-accent/50 transition-colors"
          >
            {subItem.title}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

const Sidebar = () => {
  const pathname = "/"; // Bu kısmı Next.js usePathname hook'u ile dinamik hale getirebilirsiniz

  return (
    <div className={cn("w-64 fixed top-0 left-0 bottom-0 bg-background border-r h-screen flex flex-col", className)}>
      <div className="p-4 border-b">
        <h2 className="font-bold text-xl">Panel</h2>
      </div>

        <div className="p-3">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <MenuItem 
                key={index} 
                item={item} 
                isActive={pathname === item.href} 
              />
            ))}
          </nav>
        </div>
   
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
            KA
          </div>
          <div>
            <p className="text-sm font-medium">Kullanıcı Adı</p>
            <p className="text-xs text-muted-foreground">kullanici@ornek.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;