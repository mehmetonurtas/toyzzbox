import { LogOut, Settings, User2Icon } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "@/auth";



export default function SignInButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <div className="flex items-center">
  <User2Icon size="20" />
  <span className="ml-2">Giriş Yap</span>
</div>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
     
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">

              <span className="mx-auto">Giriş Yap</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Link href="/settings">
              <span>Üye Ol</span>
            </Link>
          </DropdownMenuItem>

            
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
