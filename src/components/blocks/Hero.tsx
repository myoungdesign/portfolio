'use client';

import { animate, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type IntroConfig = {
  delay: number;
  duration: number;
  ease?: readonly [number, number, number, number];
};

const DEFAULT_EASE = [0.16, 1, 0.3, 1] as const;

const slideUp = ({ delay, duration, ease = DEFAULT_EASE }: IntroConfig) => ({
  initial: { y: '110%' },
  animate: { y: 0 },
  transition: { duration, ease, delay },
});

const slideDown = ({ delay, duration, ease = DEFAULT_EASE }: IntroConfig) => ({
  initial: { y: '-110%', filter: 'blur(1px)' },
  animate: { y: 0, filter: 'blur(0px)' },
  transition: { duration, ease, delay },
});

function Counter({
  to,
  duration = 0.3,
  delay = 0,
  suffix = '',
  className,
}: {
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.55, 0.08, 0.68, 0.53],
      onUpdate: latest => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [to, duration, delay]);

  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  );
}

// All in viewport-height fractions, independently tunable.
const HERO_HOLD = 0.3; // extra scroll before the section below starts sliding over the hero
const HERO_FADE_START = 0.4; // scroll position at which hero content begins to fade/scale
const HERO_FADE_END = 1.0; // scroll position at which hero content is fully gone

export function Hero() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(() => (typeof window === 'undefined' ? 800 : window.innerHeight));

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const fadeStart = vh * HERO_FADE_START;
  const fadeEnd = vh * HERO_FADE_END;

  const opacity = useTransform(scrollY, [fadeStart, fadeEnd], [1, 0]);
  const scale = useTransform(scrollY, [fadeStart, fadeEnd], [1, 0.96]);
  const pointerEvents = useTransform(scrollY, v => (v > fadeEnd * 0.99 ? 'none' : 'auto'));

  const HEADLINE_1: IntroConfig = { delay: 1.0, duration: 1.0 };
  const HEADLINE_2: IntroConfig = { delay: 1.4, duration: 1.6 };
  const BADGE: IntroConfig = { delay: 2.4, duration: 0.5 };
  const STATS: IntroConfig = { delay: 2.4, duration: 0.7 };
  const D_COUNTER = STATS.delay + STATS.duration - 0.4;

  return (
    <>
      <motion.section
        style={{ opacity, pointerEvents }}
        className="fixed top-0 inset-0 z-[1] flex h-screen items-start lg:items-center overflow-hidden bg-gray-10 px-xl pt-[var(--header-h,5rem)] lg:pt-0"
      >
        {/* Portrait — anchored bottom-right on mobile, right column on md+. Scales with viewport. */}
        <motion.div
          style={{ scale }}
          className="absolute select-none right-0 bottom-0 h-[60vh] w-[80vw] max-w-[520px] md:h-[70vh] md:w-[65vw] md:max-w-[680px] origin-bottom-right lg:right-auto lg:bottom-auto lg:top-0 lg:left-[45%] lg:w-[50%] lg:h-screen lg:max-w-none lg:origin-left xl:left-[50%] xl:w-[45%] 2xl:w-[40%]"
        >
          <Image
            src="/images/home-hero.jpg"
            alt="Mike Young"
            fill
            className="object-cover object-[50%_30%] opacity-70 md:opacity-100 lg:object-bottom"
            priority
          />
          {/* Fades that protect copy legibility behind the image. */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-gray-10 to-transparent lg:w-2/5" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-gray-10 to-transparent lg:hidden" />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-10 to-transparent" />
        </motion.div>

        {/* Content */}
        <motion.div style={{ scale }} className="relative mx-auto w-full origin-center">
          <div className="flex flex-col gap-6 md:gap-8 pt-2xl">
            {/* Availability badge */}
            <div className="overflow-hidden w-fit">
              <motion.div
                {...slideUp(BADGE)}
                className="flex h-11 w-fit items-center gap-2 rounded-full border border-green-50 px-5"
              >
                <span className="size-1.5 rounded-full bg-green-70" />
                <span className="whitespace-nowrap font-sans text-sm text-green-60">
                  Available for work
                </span>
              </motion.div>
            </div>

            {/* Headline */}
            <div className="pt-2">
              <div className="overflow-hidden">
                <motion.h1
                  {...slideUp(HEADLINE_1)}
                  className="font-serif text-5xl md:text-7xl lg:text-[4rem] xl:text-[5rem] 2xl:text-[7rem] font-[320] leading-snug tracking-tight text-white"
                >
                  Growth-Driven
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  {...slideDown(HEADLINE_2)}
                  className="font-serif text-5xl md:text-7xl lg:text-[4rem] xl:text-[5rem] 2xl:text-[7rem] font-[320] leading-snug tracking-tight text-white"
                >
                  Product Designer
                  <span className="text-red-50">.</span>
                </motion.h1>
              </div>
            </div>

            {/* Stats + bio row */}
            <div className="overflow-hidden">
              <motion.div
                {...slideUp(STATS)}
                className="flex flex-col lg:flex-row-reverse w-full items-start lg:items-center gap-8 lg:max-w-[720px] 2xl:max-w-[900px]"
              >
                {/* Bio */}
                <p className="text-lg 2xl:text-xl text-gray-80">
                  {`Hi, I'm `}
                  <span className="text-white font-medium">Mike Young</span>
                  {` — a London-based Product Designer with deep B2B experience in blending product strategy and design to ship products that transform complex systems into easy-to-use experiences.`}
                </p>

                {/* Vertical divider */}
                <div className="self-stretch bg-gray-40 h-px w-[40%] lg:h-auto lg:w-px " />

                {/* Years experience */}
                <div className="flex shrink-0 flex-col py-1">
                  <Counter
                    to={15}
                    duration={0.5}
                    delay={D_COUNTER}
                    suffix="+"
                    className="block font-serif font-[400] text-5xl md:text-7xl leading-none text-white tabular-nums"
                  />
                  <p className="text-sm md:text-md uppercase tracking-wide text-gray-70">
                    Years experience
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>
      <div style={{ height: `${(1 + HERO_HOLD) * 100}vh` }} className="w-full" />
    </>
  );
}
