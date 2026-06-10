// Fictional engineering company "logos" rendered as wordmarks
// — keeps things real-looking without using actual brand IP.
const COMPANIES = [
  { name: 'HELIX', style: 'font-bold tracking-tighter' },
  { name: 'strato', style: 'font-light italic tracking-tight' },
  { name: 'APEX/9', style: 'font-mono font-semibold tracking-tight' },
  { name: 'foundry', style: 'font-bold tracking-[-0.05em]' },
  { name: 'mesh.io', style: 'font-light tracking-tight' },
  { name: 'KILN', style: 'font-black tracking-widest' },
  { name: 'orbital', style: 'font-medium italic tracking-tighter' },
  { name: 'NORTH↗', style: 'font-semibold tracking-tight' },
];

const LogoStrip = () => {
  const items = [...COMPANIES, ...COMPANIES]; // duplicate for seamless marquee

  return (
    <section className="border-y border-white/[0.06] py-12 sm:py-16 overflow-hidden">
      <div className="text-center mb-8 sm:mb-10">
        <span className="font-mono text-[11px] uppercase tracking-widest text-white/35">
          Trusted by engineering teams shipping faster
        </span>
      </div>

      <div className="relative">
        {/* fade masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((company, i) => (
            <span
              key={i}
              className={`mx-10 sm:mx-14 text-white/40 hover:text-white/70 transition-colors text-xl sm:text-2xl ${company.style}`}
            >
              {company.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
