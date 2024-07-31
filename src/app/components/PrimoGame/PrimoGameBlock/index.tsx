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
  return (
    <div
      className="flex justify-center items-center"
      style={{
        minWidth: `${itemWidth}px`,
      }}
    >
      <img
        src={`/assets/prizes/${prizeNumber}.png`}
        alt="Prize"
        className={`${
          winningNumber === prizeNumber && !isAnimating
            ? "brightness-150 scale-110 z-10 transition-all ease-in-out duration-300"
            : "brightness-50"
        }`}
      />
    </div>
  );
}
