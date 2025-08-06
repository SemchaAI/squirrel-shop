interface IProps {
  title?: string;
  text?: string;
}

export const AccessDenied = ({ title, text }: IProps) => {
  return (
    <div className="flex h-[calc(100svh-160px)] flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-primary">
        {title || "Access Denied"}
      </h1>
      <p className="mt-2">{text || "You do not have access to this page."}</p>
    </div>
  );
};
