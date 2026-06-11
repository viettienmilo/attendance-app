/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { Outlet, useLocation } from 'react-router';
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Custom components
 */
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';

const MainLayout = () => {
  const location = useLocation();

  const isShowed =
    location.pathname.includes('admin') ||
    location.pathname.includes('program');

  return (
    <div className='containter flex flex-col h-dvh overflow-hidden'>
      {/* MAIN HEADER/ NAVIGATION BAR */}
      {!isShowed && <Header />}

      {/* MAIN CONTENT AREA WITH SCROLLAREA */}
      <ScrollArea className={cn('flex-1 min-h-0', !isShowed ? 'mt-16' : '')}>
        <main className='min-h-full'>
          <Outlet />
        </main>
      </ScrollArea>

      {/* FOOTER */}
      {!isShowed && <Footer className='h-14' />}
    </div>
  );
};

export default MainLayout;
