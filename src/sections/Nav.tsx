import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../components/Button';

const LINKS = [
  { label: 'Product', href: '#features' },
  { label: 'Try free', href: '#trial' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'How it works', href: '#how-it-works' },
];

const Logo = () => (
  <a href="#" className="flex items-center gap-2 group">
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform group-hover:rotate-90 duration-500"
    >
      <path
        d="M2 2H14L20 8V20H8L2 14V2Z"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M2 2L8 8H14L20 8" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <path d="M8 8V20" stroke="white" strokeWidth="1.5" opacity="0.4" />
    </svg>
    <span className="font-semibold text-base tracking-tight text-white">notch</span>
  </a>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'backdrop-blur-xl bg-black/80 border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-5 sm:px-8 h-14 sm:h-16">
        <Logo />

        {/* Desktop links — centered */}
        <ul className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-[13px] font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2 sm:gap-3">
          <a
            href="#pricing"
            onClick={(e) => { e.preventDefault(); handleNavClick('#pricing'); }}
            className="text-[13px] font-medium text-white/60 hover:text-white transition-colors px-2 cursor-pointer"
          >
            Sign in
          </a>
          <Button variant="primary" size="sm" href="#pricing">
            Try Notch
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border-hairline text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl px-5 pb-6 pt-4 flex flex-col gap-1">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="py-3 text-base font-medium text-white/70 hover:text-white border-b border-white/[0.05] last:border-0 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href="#pricing"
              onClick={(e) => { e.preventDefault(); handleNavClick('#pricing'); }}
              className="w-full text-center py-2.5 text-sm font-medium text-white/60 hover:text-white border-hairline rounded-full transition-colors"
            >
              Sign in
            </a>
            <Button variant="primary" size="md" href="#pricing" className="w-full">
              Try Notch free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
