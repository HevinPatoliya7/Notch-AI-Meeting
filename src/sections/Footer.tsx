const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Brand', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'Help center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Trust', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'DPA', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] pt-16 sm:pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top section: logo + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 sm:gap-10 mb-14 sm:mb-20">
          {/* Logo + tagline */}
          <div className="col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <path d="M2 2H14L20 8V20H8L2 14V2Z" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M2 2L8 8H14L20 8" stroke="white" strokeWidth="1.5" opacity="0.4" />
                <path d="M8 8V20" stroke="white" strokeWidth="1.5" opacity="0.4" />
              </svg>
              <span className="font-semibold tracking-tight">notch</span>
            </div>
            <p className="text-[13.5px] text-white/45 leading-relaxed max-w-xs">
              AI meeting notes for engineering teams. From conversation to commit
              — in one click.
            </p>

            {/* Status pill */}
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-4 w-fit rounded-full border-hairline bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-white/55 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              All systems operational
            </a>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#') && link.href.length > 1) {
                          e.preventDefault();
                          const el = document.querySelector(link.href);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="text-[13.5px] text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="font-mono text-[11px] text-white/35">
            © 2026 Notch Labs, Inc. · Fictional product, real portfolio piece.
          </p>
          <p className="font-mono text-[11px] text-white/35">
            Designed & built by{' '}
            <a
              href="https://www.linkedin.com/in/hevinpatoliya9106011772/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white underline-offset-4 hover:underline"
            >
              Hevin Patoliya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
