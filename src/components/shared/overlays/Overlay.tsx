interface IProps {
  onClick?: () => void;
}
export const Overlay = ({ onClick }: IProps) => {
  return (
    <div
      onClick={onClick}
      className="fixed top-0 left-0 z-10 h-dvh w-full bg-black/50"
    />
  );
};
