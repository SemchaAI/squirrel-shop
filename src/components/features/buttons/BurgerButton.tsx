interface IProps {
  isOpen: boolean;
  onClick?: () => void;
}

export const BurgerButton = ({ isOpen, onClick }: IProps) => {
  return (
    <button
      className={`relative z-11 flex h-6 w-8 cursor-pointer flex-col justify-between transition-transform duration-400 md:hidden ${isOpen ? "rotate-y-180" : ""}`}
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <span
        className={`block h-1 rounded bg-high-contrast transition-transform duration-400 ease-in-out ${
          isOpen ? "translate-y-2.5 rotate-45 bg-white" : ""
        }`}
      />
      <span
        className={`block h-1 rounded bg-high-contrast transition-transform duration-400 ease-in-out ${
          isOpen ? "scale-x-0" : ""
        }`}
      />
      <span
        className={`block h-1 rounded bg-high-contrast transition-transform duration-400 ease-in-out ${
          isOpen ? "-translate-y-2.5 -rotate-45 bg-white" : ""
        }`}
      />
    </button>
  );
};
