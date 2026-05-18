import Link from 'next/link';

import { cn } from '@/utils';

type NavigationMenuItemProps = {
  href: string;
  text: string;
  active?: boolean;
};

export function NavigationMenuItem({ href, text, active }: NavigationMenuItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-8 items-center justify-center whitespace-nowrap rounded-full px-4 text-sm tracking-wide font-medium transition-colors',
        active ? 'bg-gray-50 text-white' : 'text-gray-70 hover:text-white'
      )}
    >
      {text}
    </Link>
  );
}
