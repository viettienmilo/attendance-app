/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Libraries
 */
import { authClient } from '@/auth-client';
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppBrand from '@/AppBrand';
// import Navbar from '@/Navbar';
import ThemeChanger from '@/ThemeChanger';

/**
 * Assets
 */
import { Menu01Icon, Cancel01Icon } from 'hugeicons-react';

/**
 * Types
 */
import type React from 'react';

const Header = ({ className, ...props }: React.ComponentProps<'header'>) => {
  const { data: session } = authClient.useSession();
  const [mobilMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(location.pathname);

  if (location.pathname !== previousPath) {
    setPreviousPath(location.pathname);
    setMobileMenuOpen(false);
  }

  return (
    <header
      className={cn(
        'border-b fixed top-0 left-0 w-full h-16 grid items-center bg-background z-40 shadow-lg',
        className,
      )}
      {...props}
    >
      <div className='container py-3 flex items-center gap-4'>
        <AppBrand />
        <div
          className={cn(
            'grow max-md:absolute max-md:top-16 max-md:left-0 max-md:bg-background max-md:w-full max-md:border-b md:flex md:justify-between md:items-center',
            !mobilMenuOpen && 'max-md:hidden',
          )}
        >
          <div></div>
          {/* <Navbar className='max-md:p-4 md:ms-4 ' /> */}

          <AnimatePresence>
            <Separator className='md:hidden' />
            <motion.div
              key='auth-actions'
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className='flex flex-col-reverse gap-y-3 gap-x-2 md:flex-row md:items-center max-md:p-4'
            >
              <Button>
                <Link
                  to='/program'
                  viewTransition
                >
                  Xem đề cương
                </Link>
              </Button>
              {!session ? (
                <Button asChild>
                  <Link
                    to='/sign-in'
                    viewTransition
                  >
                    Đăng nhập
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link
                    to='/admin'
                    viewTransition
                  >
                    Dashboard
                  </Link>
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className='flex items-center gap-1 ms-auto'>
          <ThemeChanger />
          <Button
            variant='ghost'
            className='md:hidden'
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobilMenuOpen ? 'close menu' : 'open menu'}
          >
            {mobilMenuOpen ? <Cancel01Icon /> : <Menu01Icon />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
