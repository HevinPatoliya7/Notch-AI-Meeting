import { motion } from 'framer-motion';
import Eyebrow from '../components/Eyebrow';

const STEPS = [
  {
    n: '01',
    title: 'Add Notch to your call',
    desc: 'Drop the Notch bot into Zoom, Meet, or Slack Huddle. Or upload a recording after the fact.',
    code: '$ notch join standup-tuesday',
  },
  {
    n: '02',
    title: 'Notch listens & structures',
    desc: 'In real time, Notch identifies action items, decisions, blockers, and ownership. Speaker-aware. Code-aware. Linear-aware.',
    code: '→ parsing utterances · 184 lines · 8m24s',
  },
  {
    n: '03',
    title: 'Ship the recap. Auto-pilot the rest.',
    desc: 'Action items appear in Linear/GitHub with the right owner. A recap lands in Slack. You move on to the next thing.',
    code: '✓ created PRJ-3851  · assigned @alex',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start sm:items-center text-left sm:text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <Eyebrow className="mb-5">HOW IT WORKS</Eyebrow>
          <h2
            className="text-fade font-semibold tracking-tighter leading-[1.05]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            From conversation to commit, in three steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border-hairline">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-black p-8 sm:p-10 flex flex-col gap-5 min-h-[280px]"
            >
              <span
                className="font-mono text-[11px] uppercase tracking-widest text-white/30"
              >
                STEP {step.n}
              </span>

              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-tight">
                {step.title}
              </h3>

              <p className="text-[14px] sm:text-[15px] text-white/55 leading-relaxed flex-1">
                {step.desc}
              </p>

              {/* Code annotation */}
              <div className="rounded-lg border-hairline bg-white/[0.02] px-3.5 py-2.5 font-mono text-[12px] text-violet-soft/80 truncate">
                {step.code}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
