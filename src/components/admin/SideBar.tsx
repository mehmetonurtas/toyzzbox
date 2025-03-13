import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      items: [
        {
          title: "Ana Sayfa",
          url: "/",
        },
        {
          title: "Veri Analizleri",
          url: "#",
        },
      ],
    },
    {
      title: "İçerik Yönetim Sistemleri",
      url: "#",
      items: [
        {
          title: "ÜrünleR",
          url: "#",
        },
        {
          title: "Kategoriler",
          url: "#",
          isActive: true,
        },
        {
          title: "Markalar",
          url: "#",
        },
        {
          title: "Nitelikler",
          url: "#",
        },
        {
          title: "Sayfalarım",
          url: "#",
        },
        {
          title: "Siparişlerim",
          url: "#",
        },
        {
          title: "Notlarım",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
       
      ],
    },
    {
      title: "Müşteri İlişlileri Yönetimi",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },

  ],
}

export function SideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
   
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
