/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Custom module
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * Interfaces
 */
interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

interface SocialIconItemProps {
  icon: React.ComponentType<SocialIconProps>;
  href: string;
  label: string;
  tooltip?: boolean;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const iconBaseClasses = 'transition-all duration-300 ease-in-out shrink-0';

/**
 * Facebook
 */
export const FacebookIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
  style,
  ...props
}: SocialIconProps) => (
  <svg
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`${iconBaseClasses} ${className}`}
    style={{ width: size, height: size, ...style }}
    {...props}
  >
    <path d='M12 21.25c5.108 0 9.25-4.142 9.25-9.25 0-5.109-4.142-9.25-9.25-9.25S2.75 6.891 2.75 12c0 5.108 4.142 9.25 9.25 9.25Zm0 0v-7.75m3.75-6h-1.25c-1.38 0-2.5 1.12-2.5 2.5v3.5m0 0H9.25m2.75 0h2.75' />
  </svg>
);

/**
 * Youtube
 */
export const YoutubeIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
  style,
  ...props
}: SocialIconProps) => (
  <svg
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`${iconBaseClasses} ${className}`}
    style={{ width: size, height: size, ...style }}
    {...props}
  >
    <rect
      width='20'
      height='14'
      x='2'
      y='5'
      rx='5'
    />
    <path d='m10 14 4-2-4-2v4Z' />
  </svg>
);

/**
 * Github
 */
export const GithubIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
  style,
  ...props
}: SocialIconProps) => (
  <svg
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`${iconBaseClasses} ${className}`}
    style={{ width: size, height: size, ...style }}
    {...props}
  >
    <circle
      cx='12'
      cy='12'
      r='10'
    />
    <path d='M14.25 18.5v-2.8c0-.7-.2-1.3-.7-1.7 2.1 0 4.2-1.4 4.2-3.8 0-.9-.3-1.7-.8-2.4.1-.7.1-1.5-.1-2.4 0 0-.7 0-2.1 1-.6-.2-1.3-.3-2-.3s-1.4.1-2 .3c-1.4-1-2.1-1-2.1-1-.2.9-.2 1.7-.1 2.4-.5.7-.8 1.5-.8 2.4 0 2.4 2.1 3.8 4.2 3.8-.4.4-.6 1-.7 1.4-.3.2-.8.4-1.3.4-.4 0-.9-.2-1.2-.7-.3-.4-.7-.5-1.1-.5-.4 0-.2.3.1.5.2.2.4.5.5.9.1.4.4.7.9.7.5 0 1-.2 1.3-.5v1.8' />
  </svg>
);

/**
 * Zalo
 */
export const ZaloIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
  style,
  ...props
}: SocialIconProps) => (
  <svg
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`${iconBaseClasses} ${className}`}
    style={{ width: size, height: size, ...style }}
    {...props}
  >
    <path d='M19 4.5H7.5C3.8 7.8 2.7 12.2 6 18.6c.2.8-.2 1.6-.9 2.4 1.1.1 2.1-.1 3-.6 6.2 2.8 9.7 1 13.1-1.2l.02-13.7a1 1 0 0 0-1-1Z' />
    <polyline points='8 10.5 11 10.5 8 15 11 15' />
    <circle
      cx='17.5'
      cy='12.5'
      r='1.2'
    />
    <path d='M13.5 13.5v-.5c0-.6-.5-1.1-1.1-1.1s-1.1.5-1.1 1.1v.5c0 .6.5 1.1 1.1 1.1s1.1-.5 1.1-1.1Z' />
    <line
      x1='13.5'
      y1='15'
      x2='13.5'
      y2='11.5'
    />
    <path d='M15 10.5v4a.5.5 0 0 0 .5.5h.5' />
  </svg>
);

/**
 * LinkedIn
 */
export const LinkedInIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
  style,
  ...props
}: SocialIconProps) => (
  <svg
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`${iconBaseClasses} ${className}`}
    style={{ width: size, height: size, ...style }}
    {...props}
  >
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect
      width='4'
      height='12'
      x='2'
      y='9'
    />
    <circle
      cx='4'
      cy='4'
      r='2'
    />
  </svg>
);

/**
 * Tiktok
 */
export const TiktokIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
  style,
  ...props
}: SocialIconProps) => (
  <svg
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`${iconBaseClasses} ${className}`}
    style={{ width: size, height: size, ...style }}
    {...props}
  >
    <path d='M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5' />
  </svg>
);

/**
 * Instagram
 */
export const InstagramIcon = ({
  size = 24,
  strokeWidth = 2,
  className,
  style,
  ...props
}: SocialIconProps) => (
  <svg
    viewBox='0 0 24 24'
    width={size}
    height={size}
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`${iconBaseClasses} ${className}`}
    style={{ width: size, height: size, ...style }}
    {...props}
  >
    <rect
      width='20'
      height='20'
      x='2'
      y='2'
      rx='5'
      ry='5'
    />
    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
    <line
      x1='17.5'
      x2='17.51'
      y1='6.5'
      y2='6.5'
    />
  </svg>
);

/**
 * @description link with icon and tooltip
 */
export const SocialLink = ({
  icon: Icon,
  href,
  label,
  tooltip = false,
  size = 20,
  strokeWidth = 2,
  className,
}: SocialIconItemProps) => {
  const content = (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex items-center justify-center'
    >
      <Icon
        size={size}
        strokeWidth={strokeWidth}
        className={cn(
          'transition-all duration-300 ease-in-out',
          'group-hover:scale-115 group-hover:stroke-[1.5px]', // Hiệu ứng hover
          className,
        )}
      />
    </a>
  );

  if (!tooltip) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
