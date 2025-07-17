import clsx from "clsx";

interface IProps {
  className?: string;
}
export const Skeleton = ({ className }: IProps) => {
  return (
    <div className={clsx("animate-pulse bg-ui-selected", className)}></div>
  );
};
