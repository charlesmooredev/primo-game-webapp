import { useMemo } from "react";

interface Props {
  itemWidth: number;
  prizeNumber: number;
  winningNumber: number;
  isAnimating: boolean;
}

export function PrimoGameBlock({
  itemWidth,
  prizeNumber,
  isAnimating,
  winningNumber,
}: Props) {
  const cardCls = useMemo(() => {
    return `${
      winningNumber === prizeNumber && !isAnimating
        ? "brightness-150 w-full z-10 transition-all ease-in-out duration-300"
        : "brightness-50 w-9/12"
    } aspect-square`;
  }, [isAnimating, prizeNumber, winningNumber]);

  return (
    <div
      className="flex justify-center items-center aspect-square"
      style={{
        minWidth: `${itemWidth}px`,
      }}
    >
      <img
        src={`/assets/prizes/${prizeNumber}.png`}
        alt="Prize"
        className={cardCls}
      />
    </div>
  );
}
