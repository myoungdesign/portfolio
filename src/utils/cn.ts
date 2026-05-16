import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'border-color': [{ border: ['emphasis', 'subtle', 'outline'] }],
      'text-color': [
        {
          text: [
            'emphasis',
            'muted',
            'subtle',
            'soft',
            'gentle',
            'disabled',
            'placeholder',
            'inverse',
          ],
        },
      ],
      'bg-color': [
        { bg: ['canvas', 'surface', 'elevated', 'muted', 'subtle', 'soft', 'gentle', 'inverse'] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
