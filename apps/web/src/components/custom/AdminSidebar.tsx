/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { NavLink } from 'react-router';

/**
 * Hooks
 */
import { useSidebar } from '@/components/ui/sidebar';

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
import AppBrand from '@/components/custom/AppBrand';
import AdminMenu from '@/components/custom/AdminMenu';

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

const AdminSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { setOpenMobile } = useSidebar();

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
                  viewTransition={true}
                  onClick={() => setOpenMobile(false)} // auto close when select item link
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
