/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion, AnimatePresence } from 'motion/react';

/**
 * Libraries
 */
import { cn } from '@/lib/utils';

/**
 * Assets
 */
import { Loading02Icon } from 'hugeicons-react';

/**
 * Motion animation
 */
const fadeInOut = {
  initial: { opacity: 0, translateY: -10 },
  animate: { opacity: 1, translateY: 0 },
  exit: { opacity: 0, translateY: -10 },
};

/**
 * @description Hydrate fallback displays an loading icon
 */
const HydrateFallback = ({ className }: React.ComponentProps<'div'>) => {
  return (
    <AnimatePresence>
      <motion.div
        {...fadeInOut}
        className={cn(
          'fixed left-1/2 -translate-x-1/2 top-30 p-2 bg-muted rounded-full shadow-lg',
          className,
        )}
      >
        <Loading02Icon
          size={32}
          className='animate-spin'
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default HydrateFallback;
