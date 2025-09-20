import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent transition-colors">
        <Avatar className="h-10 w-10">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/40/40" alt="User" data-ai-hint="user avatar" />
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1 truncate group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium leading-none text-sidebar-foreground">User</p>
            <p className="text-xs leading-none text-sidebar-foreground/70 truncate">
              user@example.com
            </p>
        </div>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full group-data-[collapsible=icon]:hidden">
                <MoreHorizontal className="h-4 w-4 text-sidebar-foreground/70"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User</p>
                <p className="text-xs leading-none text-muted-foreground">
                user@example.com
                </p>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem asChild>
                <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                </Link>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
            <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
