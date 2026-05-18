import { LinkedIn } from '@/components/icons';
import { LINKEDIN_URL } from '@/constants';
import { cn } from '@/utils';

type NavbarButtonProps = {
  className?: string;
};

export function NavbarButton({ className }: NavbarButtonProps) {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex h-9 items-center gap-[10px] whitespace-nowrap rounded-full px-4 text-sm tracking-wide font-medium text-white transition-opacity hover:underline [&_svg]:size-5',
        className
      )}
    >
      <LinkedIn />
      Connect on LinkedIn
    </a>
  );
}
