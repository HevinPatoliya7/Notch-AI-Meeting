import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'ghost' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
}

const Button = ({
  children,
  href = '#',
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconRight,
  onClick,
}: ButtonProps) => {
  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-sm',
  };

  const variants = {
    primary:
      'bg-white text-black hover:bg-white/90 glow-violet font-medium',
    ghost:
      'bg-transparent text-white/90 hover:text-white border-hairline-bright hover:border-white/30 font-medium',
    subtle:
      'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border-hairline font-medium',
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }
    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {iconRight}
    </a>
  );
};

export default Button;
