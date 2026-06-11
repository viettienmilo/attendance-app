/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { Outlet } from 'react-router';

/**
 * Components
 */
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Custom components
 */
import TopAppBar from '@/components/custom/TopBar';
import ProgramSidebar from '@/components/custom/ProgramSidebar';

const ProgramLayout = () => {
  return (
    <SidebarProvider>
      <ProgramSidebar />
      <SidebarInset className='relative max-h-[calc(100dvh-16px)]'>
        <TopAppBar />
        <ScrollArea className='flex-1 overflow-auto'>
          <Outlet />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProgramLayout;
