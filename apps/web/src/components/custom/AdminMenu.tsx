/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { useNavigate } from 'react-router';
import Avatar from 'react-avatar';

/**
 * Libraries
 */
import { authClient } from '@/auth-client/auth-client';

/**
 * Components
 */
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

/**
 * Assets
 */
import { ArrowUp01Icon, Logout03Icon } from 'hugeicons-react';

const AdminMenu = () => {
  const { isMobile } = useSidebar();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const navigate = useNavigate();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate('/', { viewTransition: true, replace: true });
        },
        onError: (ctx) => {
          alert('Lỗi đăng xuất ' + ctx.error);
        },
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar
                src={user?.image || ''}
                name={user?.name ?? user?.email}
                size='32'
                round={true}
              />
              <div className='grid flex-1 text-left leading-tight md:text-md'>
                <div className='truncate font-medium'>{user?.name}</div>
              </div>
              <ArrowUp01Icon className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
            align='end'
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar
                  src={user?.image || ''}
                  name={user?.name ?? user?.email}
                  size='32'
                  round={true}
                />
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <div className='truncate font-medium text-primary'>
                    {user?.name}
                  </div>
                  <div className='truncate text-xs'>{user?.email}</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup className='flex flex-col gap-1'>
              <DropdownMenuItem
                className='flex items-center py-1 text-xs'
                onClick={signOut}
              >
                <Logout03Icon />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AdminMenu;
