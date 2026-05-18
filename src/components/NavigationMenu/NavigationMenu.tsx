import { NavigationMenuItem } from './NavigationMenuItem';

const NAV_ITEMS = [
  { href: '/', text: 'Work' },
  { href: '/method', text: 'Method' },
  { href: '/writings', text: 'Writings' },
  { href: '/about', text: 'About' },
] as const;

type NavigationMenuProps = {
  pathname: string;
};

export function NavigationMenu({ pathname }: NavigationMenuProps) {
  return (
    <nav className="flex items-center gap-2 p-1 border border-gray-45 rounded-full">
      {NAV_ITEMS.map(({ href, text }) => (
        <NavigationMenuItem key={href} href={href} text={text} active={pathname === href} />
      ))}
    </nav>
  );
}
