'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Award, LayoutDashboard, Recycle, Trash2, HardDrive } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

const mainLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/rewards', label: 'Rewards', icon: Award },
];

const estimateSubLinks = [
  { href: '/estimate/e-waste', label: 'E-Waste', icon: HardDrive },
  { href: '/estimate/metal-scrap', label: 'Metal Scrap', icon: Trash2 },
];

export function SidebarNav() {
  const pathname = usePathname();
  const isEstimateActive = pathname.startsWith('/estimate');

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={isEstimateActive}
              tooltip="Estimate Scrap"
              className="w-full"
            >
              <Recycle />
              <span>Estimate Scrap</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {estimateSubLinks.map((link) => (
                <SidebarMenuSubItem key={link.href}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === link.href}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>

      {mainLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
