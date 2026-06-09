/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { Outlet, Navigate } from 'react-router';

/**
 * Libraries
 */
import { authClient } from '@/auth-client';

/**
 * Components
 */
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Custom components
 */
import AdminSidebar from '@/AdminSidebar';
import TopAppBar from '@/TopBar';

/**
 * @description master layout for all authed routes (admin, editor)
 *  with sidebar, topbar
 */
const AdminLayout = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p>Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <Navigate
        to='/sign-in'
        replace
      />
    );
  }

  const hasAccess = session.user.role === 'admin';
  // Logged in but unauthorized
  if (!hasAccess) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className='relative max-h-[calc(100dvh-16px)]'>
        <TopAppBar />
        <ScrollArea className='flex-1 overflow-auto'>
          <Outlet />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
