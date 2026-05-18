'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Logo } from '@/components/Logo';
import { MobileMenu, MobileMenuButton } from '@/components/MobileMenu';
import { Navbar } from '@/components/Navbar';

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 800 : window.innerHeight));
  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const y = useTransform(scrollY, [vh * 0.1, vh * 0.5], ['0%', '-100%']);
  // Spring smooths the y track — fast initial response, then decelerates into
  // place. Gives the slide-back-in a "snap then settle" feel.
  const ySpring = useSpring(y, { stiffness: 340, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header className="sticky w-[100%] top-0 z-50" style={{ y: mobileOpen ? 0 : ySpring }}>
        {/* Desktop */}
        <div className="hidden h-32 items-center px-xl md:flex">
          <Navbar pathname={pathname} />
        </div>

        {/* Mobile */}
        <div className="flex h-24 items-center justify-between bg-gray-10 px-xl md:hidden">
          <Logo className="h-14 w-auto text-gray-80" strokeWidth={1.0} />
          <MobileMenuButton open={mobileOpen} onClick={() => setMobileOpen(v => !v)} />
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} pathname={pathname} onClose={() => setMobileOpen(false)} />
    </>
  );
}
