import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'border-color': [{ border: ['default', 'emphasis', 'subtle', 'outline'] }],
      'text-color': [
        {
          text: [
            'default',
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
      'bg-color': [{ bg: ['canvas', 'surface', 'elevated', 'muted', 'subtle', 'soft', 'gentle', 'inverse'] }],
      'ring-color': [{ ring: ['default'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
