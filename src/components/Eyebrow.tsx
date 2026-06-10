interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

const Eyebrow = ({ children, className = '' }: EyebrowProps) => {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40 ${className}`}
    >
      <span className="inline-block h-px w-6 bg-white/20" />
      {children}
    </span>
  );
};

export default Eyebrow;
