interface IProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Container = ({ children, className, style }: IProps) => {
  return (
    <div
      className={`rounded-md border border-border bg-ui p-4 text-high-contrast shadow ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
