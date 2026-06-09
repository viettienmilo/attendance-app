/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Assets
 */
import {
  PaintBoardIcon,
  BrushIcon,
  DarkModeIcon,
  Sun01Icon,
  Moon01Icon,
  LaptopIcon,
} from 'hugeicons-react';

/**
 * @description change theme and them mode
 */
export default function ThemeChanger() {
  const [flavor, setFlavor] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ui-flavor') || 'Default';
    }
    return 'astrovista';
  });

  const { theme, setTheme } = useTheme();

  // Transition effect when change theme
  const transition = (cb: () => void) => {
    if (!document.startViewTransition) {
      cb();
      return;
    }
    document.startViewTransition(cb);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', flavor);
    localStorage.setItem('ui-flavor', flavor);
  }, [flavor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='group'
        >
          <PaintBoardIcon
            className='w-5! h-5! transition-all duration-300 group-hover:scale-115 group-hover:stroke-[1.5px]'
            strokeWidth={2}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='end'
        className='w-auto min-w-50 **:text-[13px]'
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {/* THEME GROUP */}
        <DropdownMenuRadioGroup
          value={flavor}
          onValueChange={(val) => transition(() => setFlavor(val))}
        >
          <DropdownMenuLabel className='flex gap-2 text-sm'>
            <BrushIcon className='h-[1.1rem] w-[1.1rem]' />
            Themes
          </DropdownMenuLabel>
          {[
            { value: 'default', label: 'Default' },
            { value: 'mx-brutalist', label: 'Brutalist' },
            { value: 'swiss-design', label: 'Swiss' },
            { value: 'terminal', label: 'Termial' },
          ].map(({ value, label }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {/* THEME MODE GROUP */}
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(val) => transition(() => setTheme(val))}
        >
          <DropdownMenuLabel className='flex gap-2 text-sm'>
            <DarkModeIcon className='h-[1.1rem] w-[1.1rem]' />
            Themes
          </DropdownMenuLabel>
          <DropdownMenuRadioItem value='light'>
            <Sun01Icon />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark'>
            <Moon01Icon />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='system'>
            <LaptopIcon />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
