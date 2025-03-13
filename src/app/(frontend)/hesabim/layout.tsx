
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "./SideBar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <SidebarProvider>
      <SideBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>

  );
}

