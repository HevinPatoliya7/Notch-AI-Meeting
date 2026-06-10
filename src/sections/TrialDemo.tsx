import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Sparkles,
  CheckSquare,
  Square,
  GitBranch,
  X,
  ArrowRight,
  Zap,
  Clock,
  Users,
} from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import Button from '../components/Button';

/* ─── Sample meeting notes data ─────────────────────────────── */
const NOTES = [
  {
    id: 'standup',
    label: 'Daily Standup',
    tag: 'Mon · 9:02 AM',
    duration: '8m 24s',
    free: true,
    participants: ['sarah', 'alex', 'jamie', 'priya'],
    summary:
      'Deployment blocked on auth migration. Alex & Jamie pairing on it. Release 2.4 still on track for Friday pending Thursday EOD completion.',
    actions: [
      { text: 'Pair on auth migration', owner: '@alex @jamie', done: false },
      { text: 'Finalize 2.4 release notes', owner: '@sarah', done: false },
      { text: 'Confirm Thursday deploy window', owner: '@priya', done: true },
    ],
    decision: 'Ship release 2.4 on Friday, pending auth migration by Thursday EOD.',
    tags: ['PRJ-3847', 'auth-service', 'release-2.4'],
  },
  {
    id: 'incident',
    label: 'Incident Review',
    tag: 'Tue · 2:15 PM',
    duration: '22m 11s',
    free: true,
    participants: ['marco', 'priya', 'leon'],
    summary:
      'Post-mortem on the 47-minute API outage caused by a bad config push. Rate limiter misconfiguration went undetected in staging. RCA complete.',
    actions: [
      { text: 'Add config validation to CI pipeline', owner: '@leon', done: false },
      { text: 'Update runbook with rollback steps', owner: '@marco', done: false },
      { text: 'Schedule chaos engineering session', owner: '@priya', done: false },
    ],
    decision: 'All config changes require a peer review and staging smoke-test gate before prod.',
    tags: ['INC-291', 'api-gateway', 'config-mgmt'],
  },
  {
    id: 'planning',
    label: 'Sprint Planning',
    tag: 'Wed · 10:00 AM',
    duration: '41m 05s',
    free: true,
    participants: ['sarah', 'alex', 'marco', 'leon', 'priya'],
    summary:
      'Sprint 34 scoped. 18 story points committed. Search indexing refactor deferred to Sprint 35. New onboarding flow prioritised after customer feedback spike.',
    actions: [
      { text: 'Kick off onboarding redesign', owner: '@alex', done: false },
      { text: 'Move search refactor to backlog', owner: '@sarah', done: false },
      { text: 'Set up Sprint 34 Linear board', owner: '@marco', done: false },
    ],
    decision: 'Onboarding flow takes Sprint 34 priority. Search refactor pushed to Sprint 35.',
    tags: ['SPRINT-34', 'onboarding', 'search-refactor'],
  },
  {
    id: 'roadmap',
    label: 'Roadmap Review',
    tag: 'Thu · 3:30 PM',
    duration: '55m 18s',
    free: false, // ← LOCKED
    participants: ['ceo', 'cto', 'marco', 'sarah'],
    summary: 'Q3 roadmap reviewed with leadership. Enterprise tier milestones re-prioritised.',
    actions: [],
    decision: '',
    tags: [],
  },
];

/* ─── Premium upgrade modal ──────────────────────────────────── */
const UpgradeModal = ({ onClose }: { onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-violet-glow/40 bg-[#0a0a0f] overflow-hidden"
        style={{
          boxShadow:
            '0 0 80px -10px rgba(139, 92, 246, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Top glow bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors"
        >
          <X size={14} strokeWidth={2} />
        </button>

        <div className="px-8 py-8">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-800/20 border border-violet-500/30 flex items-center justify-center mb-5">
            <Sparkles size={22} className="text-violet-400" strokeWidth={1.8} />
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
            You've hit the free limit
          </h3>
          <p className="text-[14px] text-white/55 leading-relaxed mb-7">
            You've explored <span className="text-white/80 font-medium">3 free notes</span>. Upgrade
            to <span className="text-violet-400 font-medium">Notch Team</span> to unlock unlimited
            meeting notes, integrations, and your full meeting history.
          </p>

          {/* Feature bullets */}
          <ul className="space-y-3 mb-8">
            {[
              { icon: Zap, text: 'Unlimited AI meeting notes' },
              { icon: GitBranch, text: 'Linear, GitHub & Jira sync' },
              { icon: Users, text: 'Speaker-aware summaries' },
              { icon: Clock, text: 'Full searchable history' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[14px] text-white/75">
                <div className="w-6 h-6 rounded-md bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
                  <Icon size={12} strokeWidth={2} className="text-violet-400" />
                </div>
                {text}
              </li>
            ))}
          </ul>

          {/* Price callout */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 flex items-center justify-between mb-6">
            <div>
              <div className="text-[12px] text-white/40 font-mono uppercase tracking-wider mb-0.5">Team plan</div>
              <div className="text-white font-semibold">
                $12 <span className="text-sm font-normal text-white/40">/ seat · month</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 font-mono text-[10px] uppercase tracking-widest text-violet-300">
              14-day free trial
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2.5">
            <Button variant="primary" size="lg" href="#pricing" className="w-full" onClick={onClose}>
              Start 14-day free trial
            </Button>
            <button
              onClick={onClose}
              className="w-full py-2.5 text-[13px] text-white/40 hover:text-white/70 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ─── Single note card ───────────────────────────────────────── */
const NoteCard = ({
  note,
  active,
  onClick,
}: {
  note: typeof NOTES[number];
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`relative w-full text-left rounded-xl border px-4 py-3.5 transition-all duration-200 ${
      active
        ? 'border-violet-glow/50 bg-violet-glow/[0.07]'
        : note.free
        ? 'border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]'
        : 'border-white/[0.05] bg-white/[0.01] opacity-60 hover:opacity-80'
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13.5px] font-medium text-white truncate">{note.label}</span>
          {!note.free && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 font-mono text-[9px] uppercase tracking-widest text-violet-300 shrink-0">
              <Lock size={8} strokeWidth={2.5} />
              Pro
            </span>
          )}
        </div>
        <div className="font-mono text-[11px] text-white/35">{note.tag} · {note.duration}</div>
      </div>
      <div className="flex -space-x-1.5 shrink-0">
        {note.participants.slice(0, 3).map((p) => (
          <div
            key={p}
            className="w-5 h-5 rounded-full bg-white/10 border border-black flex items-center justify-center font-mono text-[8px] text-white/60 uppercase"
          >
            {p[0]}
          </div>
        ))}
        {note.participants.length > 3 && (
          <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-black flex items-center justify-center font-mono text-[8px] text-white/40">
            +{note.participants.length - 3}
          </div>
        )}
      </div>
    </div>
  </button>
);

/* ─── Note detail pane ───────────────────────────────────────── */
const NoteDetail = ({ note }: { note: typeof NOTES[number] }) => (
  <motion.div
    key={note.id}
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="h-full flex flex-col gap-5"
  >
    {/* Header */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-white mb-1">{note.label}</h3>
        <span className="font-mono text-[11px] text-white/35">{note.tag} · {note.duration}</span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Sparkles size={12} className="text-violet-400" strokeWidth={2} />
        <span className="font-mono text-[10px] uppercase tracking-widest text-violet-400/80">AI summary</span>
      </div>
    </div>

    {/* Summary */}
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-2">Overview</div>
      <p className="text-[13.5px] text-white/80 leading-relaxed">{note.summary}</p>
    </div>

    {/* Action items */}
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-3">Action items</div>
      <ul className="space-y-2.5">
        {note.actions.map((a, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {a.done ? (
              <CheckSquare size={14} className="text-violet-soft shrink-0 mt-0.5" strokeWidth={1.5} />
            ) : (
              <Square size={14} className="text-white/30 shrink-0 mt-0.5" strokeWidth={1.5} />
            )}
            <span className={`text-[13.5px] leading-snug ${a.done ? 'text-white/40 line-through' : 'text-white/80'}`}>
              {a.text}
              <span className="text-white/35 ml-2 font-mono text-[11px]">{a.owner}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>

    {/* Decision */}
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-2">Decision</div>
      <p className="text-[13.5px] text-white/75 leading-relaxed">{note.decision}</p>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-1.5">
      {note.tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-[11px] text-white/55"
        >
          <GitBranch size={9} strokeWidth={1.8} />
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

/* ─── Main TrialDemo section ─────────────────────────────────── */
const TrialDemo = () => {
  const [activeId, setActiveId] = useState('standup');
  const [showModal, setShowModal] = useState(false);

  const FREE_COUNT = NOTES.filter((n) => n.free).length;
  const activeNote = NOTES.find((n) => n.id === activeId)!;

  const handleNoteClick = (note: typeof NOTES[number]) => {
    if (!note.free) {
      setShowModal(true);
    } else {
      setActiveId(note.id);
    }
  };

  return (
    <>
      {showModal && <UpgradeModal onClose={() => setShowModal(false)} />}

      <section id="trial" className="relative py-24 sm:py-32 border-t border-white/[0.06] overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139, 92, 246, 0.1), transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start sm:items-center text-left sm:text-center max-w-2xl mx-auto mb-14 sm:mb-16"
          >
            <Eyebrow className="mb-5">FREE TRIAL</Eyebrow>
            <h2
              className="text-fade font-semibold tracking-tighter leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Explore real notes.
              <br />
              No signup needed.
            </h2>
            <p className="mt-5 text-white/55 leading-relaxed text-[15px] sm:text-base max-w-lg">
              Browse {FREE_COUNT} sample meeting notes for free — see exactly what Notch produces.
              Unlock unlimited notes, history, and integrations with a Team account.
            </p>

            {/* Free usage bar */}
            <div className="mt-7 flex items-center gap-3">
              <div className="flex gap-1.5">
                {NOTES.map((n) => (
                  <div
                    key={n.id}
                    className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                      n.free
                        ? activeId === n.id
                          ? 'bg-violet-500'
                          : 'bg-white/30'
                        : 'bg-white/[0.08] border border-white/10'
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] text-white/40">
                {FREE_COUNT}/{NOTES.length} free · <span className="text-violet-400">unlock all</span>
              </span>
            </div>
          </motion.div>

          {/* Demo panel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/[0.08] bg-[#080810] overflow-hidden"
            style={{
              boxShadow:
                '0 40px 100px -20px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.015]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-white/35">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                notch.so/workspace/demo
              </div>
              <div className="font-mono text-[11px] text-white/30">jun 2026</div>
            </div>

            {/* Two-pane layout */}
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-[480px]">
              {/* Left sidebar — note list */}
              <div className="border-b md:border-b-0 md:border-r border-white/[0.06] p-4 flex flex-col gap-2">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/30 px-1 mb-2">
                  Meeting notes
                </div>
                {NOTES.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    active={activeId === note.id}
                    onClick={() => handleNoteClick(note)}
                  />
                ))}

                {/* Upgrade nudge */}
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-auto flex items-center gap-2.5 rounded-xl border border-violet-glow/30 bg-violet-glow/[0.05] px-4 py-3 text-left hover:border-violet-glow/50 hover:bg-violet-glow/[0.09] transition-all"
                >
                  <Lock size={13} className="text-violet-400 shrink-0" strokeWidth={2} />
                  <div>
                    <div className="text-[12px] font-medium text-violet-300">Unlock all notes</div>
                    <div className="text-[11px] text-white/35 font-mono">Upgrade to Team →</div>
                  </div>
                </button>
              </div>

              {/* Right — note detail */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <NoteDetail note={activeNote} />
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              href="#pricing"
              iconRight={<ArrowRight size={14} strokeWidth={2} />}
            >
              Start free · no card needed
            </Button>
            <p className="font-mono text-[11px] text-white/35 text-center">
              Free forever for individuals · 14-day trial for teams
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TrialDemo;
