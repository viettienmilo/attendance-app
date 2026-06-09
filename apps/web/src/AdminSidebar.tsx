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
  SidebarFooter,
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
import AdminMenu from '@/AdminMenu';

/**
 * Assets
 */
import { UserGroup02Icon, Edit02Icon, CheckListIcon } from 'hugeicons-react';

/**
 * Constants
 */
const MAIN_MENU = [
  {
    label: 'Điểm danh',
    url: '',
    icon: <UserGroup02Icon />,
  },
  {
    label: 'Vào điểm',
    url: 'score',
    icon: <Edit02Icon />,
  },
  {
    label: 'Tổng kết',
    url: 'summary',
    icon: <CheckListIcon />,
  },
] as const;

/**
 * Used in Authed pages
 * @description display sidebar with navigation menu and user menu
 */
const AdminSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
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

      {/* FOOTER */}
      <SidebarFooter>
        <AdminMenu />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
