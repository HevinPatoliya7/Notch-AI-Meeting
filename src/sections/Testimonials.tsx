import { motion } from 'framer-motion';
import Eyebrow from '../components/Eyebrow';

const QUOTES = [
  {
    quote:
      "We killed three meetings the week we rolled out Notch. The action items just\u2026 happened. No one was writing them down anymore — they were already in Linear.",
    name: 'Sarah Karimi',
    role: 'Staff Eng',
    company: 'Helix',
    initial: 'SK',
  },
  {
    quote:
      'I used to dread incident reviews because no one wrote anything down. Now the recap is in my inbox before I leave the call. It is a small miracle.',
    name: 'Marco Reyes',
    role: 'Eng Manager',
    company: 'Strato',
    initial: 'MR',
  },
  {
    quote:
      "The Linear integration alone earned its budget. Owners auto-assigned, tickets auto-created. Our PMs think we got way more disciplined overnight.",
    name: 'Priya Anand',
    role: 'Director of Eng',
    company: 'Apex/9',
    initial: 'PA',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start sm:items-center text-left sm:text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <Eyebrow className="mb-5">FROM TEAMS USING NOTCH</Eyebrow>
          <h2
            className="text-fade font-semibold tracking-tighter leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            They stopped taking notes.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border-hairline bg-white/[0.015] p-7 sm:p-8 flex flex-col gap-6"
            >
              <blockquote className="text-[15px] sm:text-base leading-relaxed text-white/85">
                &ldquo;{q.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3 mt-auto">
                <div className="w-9 h-9 rounded-full border-hairline-bright bg-white/[0.04] flex items-center justify-center font-mono text-[12px] text-white/80">
                  {q.initial}
                </div>
                <div className="leading-tight">
                  <div className="text-[13.5px] font-medium text-white">{q.name}</div>
                  <div className="font-mono text-[11px] text-white/40 mt-0.5">
                    {q.role} · {q.company}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
