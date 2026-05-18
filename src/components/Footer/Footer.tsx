import { FooterButton } from './FooterButton';

export function Footer() {
  return (
    <footer className="w-full bg-gray-10 p-lg">
      <div className="mx-auto flex w-full max-w-(--container-8xl) flex-col items-center justify-center gap-8 py-6">
        <div className="flex w-full flex-col items-center gap-4 text-center text-white">
          <p className="w-full font-serif text-3xl md:text-4xl">Let&rsquo;s connect</p>
          <p className="w-full font-sans text-lg">
            Open to new opportunities, collaborations, and conversations.
          </p>
        </div>
        <FooterButton />
      </div>
    </footer>
  );
}
