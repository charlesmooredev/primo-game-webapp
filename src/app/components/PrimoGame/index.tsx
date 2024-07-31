import { Fragment, useCallback, useState } from "react";
import { AppWrapper } from "../AppWrapper";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import { primoPrizesArray } from "../../helpers/primoPrizes.tsx";
import { PrimoGameResults } from "./PrimoGameResults";
import {
  PrimoResults,
  prizeWidth,
  TIMER,
} from "../../helpers/primoGameRules.ts";
import { PrimoGameBlock } from "./PrimoGameBlock";
import { PrimoGameMotionCard } from "./PrimoGameMotionCard";

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function PrimoGame() {
  const [winningNumber, setWinningNumber] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [result, setResult] = useState<PrimoResults | null>(null);

  const handleStartAnimation = useCallback(() => {
    if (isAnimating) return;

    const newWinningNumber = generateRandomNumber(1, 20);
    setResult(null);
    setWinningNumber(newWinningNumber);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, TIMER);
  }, [isAnimating]);

  const winningIndex = primoPrizesArray
    .map((num) => num.id)
    .indexOf(winningNumber);

  const totalWidth = primoPrizesArray.length * prizeWidth;

  const targetX = -(
    (winningIndex + primoPrizesArray.length) * prizeWidth -
    containerWidth / 2 +
    prizeWidth / 2
  );

  return (
    <AppWrapper>
      <div className="flex items-center flex-col space-y-[10px]">
        <CaretDownFill size={25} />
        <PrimoGameMotionCard
          isAnimating={isAnimating}
          totalWidth={totalWidth}
          targetX={targetX}
          setResult={(e) => setResult(e)}
          setIsAnimating={(e) => setIsAnimating(e)}
          setContainerWidth={(e) => setContainerWidth(e)}
          winningNumber={winningNumber}
        >
          {[
            ...primoPrizesArray,
            ...primoPrizesArray,
            ...primoPrizesArray,
            ...primoPrizesArray,
            ...primoPrizesArray,
            ...primoPrizesArray,
          ].map((number, index) => (
            <Fragment key={index}>
              <PrimoGameBlock
                itemWidth={prizeWidth}
                prizeNumber={number.id}
                winningNumber={winningNumber}
                isAnimating={isAnimating}
              />
            </Fragment>
          ))}
        </PrimoGameMotionCard>
        <CaretUpFill size={25} />
        <button
          onClick={handleStartAnimation}
          className="py-[10px] px-[20px] border border-yellow-500 bg-gradient-to-br to-black from-yellow-600 hover:border-yellow-600"
        >
          Play
        </button>
        {!isAnimating && result !== null && (
          <PrimoGameResults results={result} />
        )}
      </div>
    </AppWrapper>
  );
}
