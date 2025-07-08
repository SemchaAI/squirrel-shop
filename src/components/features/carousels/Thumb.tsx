import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  slide: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, slide } = props;

  return (
    <div className={"min-w-0 flex-[0_0_22%] pl-1"}>
      <button
        onClick={onClick}
        type="button"
        className={`flex h-25 w-full appearance-none items-center justify-center rounded-md border bg-ui transition-colors ${selected ? "border-primary opacity-100" : "border-transparent opacity-50"}`}
      >
        <Image
          className="h-full w-full object-contain"
          priority
          width="150"
          height="150"
          src={slide}
          alt={`Thumbnail ${index}`}
        />
      </button>
    </div>
  );
};
