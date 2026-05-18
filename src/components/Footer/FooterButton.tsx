import { LinkedIn } from '@/components/icons';
import { LINKEDIN_URL } from '@/constants';

export function FooterButton() {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-bloom flex h-13 items-center gap-3 whitespace-nowrap rounded-full border border-gray-45 px-6 text-md tracking-wide font-medium text-white"
    >
      <LinkedIn size={18} />
      Connect on LinkedIn
    </a>
  );
}
