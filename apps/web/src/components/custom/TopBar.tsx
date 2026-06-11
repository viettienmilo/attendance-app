/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Libraries
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

/**
 * Custom components
 */
import ThemeChanger from '@/components/custom/ThemeChanger';
import AdminBreadcrumb from '@/components/custom/Breadcrumb';

const TopAppBar = ({ className, ...props }: React.ComponentProps<'header'>) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 flex items-center gap-1 sm:gap-2 px-4 border-b min-w-0 justify-between',
        className,
      )}
      {...props}
    >
      <div className='flex items-center gap-2'>
        <SidebarTrigger />
        <Separator
          orientation='vertical'
          className='mr-2 data-orientation:vertical:h-4'
        />
        <AdminBreadcrumb />
      </div>
      <div>
        <ThemeChanger />
      </div>
    </header>
  );
};

export default TopAppBar;
