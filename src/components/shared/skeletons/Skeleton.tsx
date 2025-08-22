import clsx from "clsx";

interface IProps {
  className?: string;
}
export const Skeleton = ({ className }: IProps) => {
  return (
    <div
      role="status"
      aria-label="loading"
      className={clsx("animate-pulse bg-ui-selected", className)}
    ></div>
  );
};
