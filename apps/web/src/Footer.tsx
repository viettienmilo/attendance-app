/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Libraries
 */
import { cn } from '@/lib/utils';

/**
 * Custom components
 */
import { SocialLink, ZaloIcon } from '@/SocialIcons';
import AppBrand from '@/AppBrand';

/**
 * Assets
 */
import { Facebook01Icon, GithubIcon, YoutubeIcon } from 'hugeicons-react';

/**
 * Contants
 */
const SOCIAL_LINKS = [
  <SocialLink
    icon={Facebook01Icon}
    href='https://www.facebook.com/nguyen.v.tien.90'
    label='Facebook Page'
    strokeWidth={1.5}
    tooltip={true}
  />,
  <SocialLink
    icon={YoutubeIcon}
    href='https://www.youtube.com/@viettien_milo'
    label='Youtube Channel'
    strokeWidth={1.5}
    tooltip={true}
  />,
  <SocialLink
    icon={GithubIcon}
    href='https://github.com/viettienmilo/'
    label='Gihub Repo'
    strokeWidth={1.5}
    tooltip={true}
  />,
  <SocialLink
    icon={ZaloIcon}
    href='https://zalo.me/0913928188'
    label='Zalo Contact'
    strokeWidth={1.5}
    tooltip={true}
  />,
] as const;

/**
 * Footer of the page
 * @description display social links with icons
 */
const Footer = ({ className, ...props }: React.ComponentProps<'footer'>) => {
  return (
    <footer
      className={cn('border-t flex items-center', className)}
      {...props}
    >
      <div className='container flex py4 justify-between items-center md:grid-cols-[1fr_3fr_1fr]'>
        <AppBrand height='h-6 md:h-8' />
        <p className='text-muted-foreground order-1 hidden md:block max-md:text-center md:order-0 md:justify-self-center text-sm'>
          &copy; {new Date().getFullYear()} viettien.milo. All rights reserved.
        </p>
        <ul className='flex items-center gap-4 max-md:mt-5 max-md:mb-4 md:justify-self-end'>
          {SOCIAL_LINKS.map((component, index) => (
            <li key={index}>{component}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
