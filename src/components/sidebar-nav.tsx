'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Award, LayoutDashboard, Recycle, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserNav } from './user-nav';

const mainLinks = [
  { href: '/estimate', label: 'Estimate Scrap', icon: Recycle },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rewards', label: 'Rewards', icon: Award },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-full">
      <SidebarMenu>
        {mainLinks.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(link.href)}
              tooltip={link.label}
            >
              <Link href={link.href}>
                <link.icon />
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
           <div className="flex justify-center w-full">
              <UserNav />
            </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
