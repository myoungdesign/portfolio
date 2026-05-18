'use client';

import Link from 'next/link';

import { NavbarButton } from '@/components/Navbar';
import { cn } from '@/utils';

const NAV_ITEMS = [
  { href: '/', text: 'Work' },
  { href: '/method', text: 'Method' },
  { href: '/writings', text: 'Writings' },
  { href: '/about', text: 'About' },
] as const;

type MobileMenuProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function MobileMenu({ open, pathname, onClose }: MobileMenuProps) {
  return (
    <div
      aria-hidden={!open}
      style={{ transform: open ? 'translateY(0)' : 'translateY(-100%)' }}
      className={cn(
        'fixed inset-x-0 bottom-0 top-24 z-40 flex flex-col bg-gray-10 touch-none transition-transform duration-300 ease-out',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      <nav className="flex flex-1 flex-col items-start gap-3 px-lg pt-lg">
        {NAV_ITEMS.map(({ href, text }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              'flex h-12 w-full max-w-60 mx-auto items-center justify-center rounded-full px-8 text-md text-center font-medium transition-colors',
              pathname === href ? 'bg-gray-40 text-white' : 'text-gray-70 hover:text-white'
            )}
          >
            {text}
          </Link>
        ))}
        <div className="mx-auto mt-4 flex justify-center">
          <NavbarButton className="max-w-60 mx-auto text-md [&_svg]:size-6" />
        </div>
      </nav>
    </div>
  );
}
