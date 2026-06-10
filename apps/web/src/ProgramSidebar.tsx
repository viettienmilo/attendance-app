/**
 * Copyright (c) 2026-present, Nguyen Viet Tien.
 * Licensed under the MIT License (the "LICENSE");
 */

/**
 * Modules
 */
import { NavLink } from 'react-router';

/**
 * Components
 */
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

/**
 * Custom components
 */
import AppBrand from '@/AppBrand';

/**
 * Assets
 */
import { SolarSystemIcon, Store02Icon, Doc02Icon } from 'hugeicons-react';

/**
 * Constants
 */
const MAIN_MENU = [
  {
    label: 'Hệ thống thông tin quản lý',
    url: '',
    icon: <SolarSystemIcon />,
  },
  {
    label: 'Thương mại điện tử',
    url: 'e-commerce',
    icon: <Store02Icon />,
  },
  {
    label: 'Tài liệu',
    url: 'docs',
    icon: <Doc02Icon />,
  },
] as const;

/**
 * Used in Authed pages
 * @description display sidebar with navigation menu and user menu
 */
const ProgramSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      variant='inset'
      {...props}
    >
      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <AppBrand height='h-10' />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENTS */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main menu</SidebarGroupLabel>
          <SidebarMenu>
            {MAIN_MENU.map(({ label, url, icon }) => (
              <SidebarMenuItem key={url}>
                <NavLink
                  to={url}
                  end={url === ''}
                >
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={label}
                    >
                      {icon}
                      <span>{label}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
};

export default ProgramSidebar;
