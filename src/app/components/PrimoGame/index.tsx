import { Fragment, useCallback, useEffect, useRef, useState } from "react";
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

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function generateRandomizedPrizes<T>(array: T[], repetitions: number): T[] {
  const shuffledArray = shuffleArray(array);
  return Array(repetitions).fill(shuffledArray).flat();
}

export function PrimoGame() {
  const [winningNumber, setWinningNumber] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [result, setResult] = useState<PrimoResults | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [randomizedPrizes, setRandomizedPrizes] = useState(() =>
    generateRandomizedPrizes(primoPrizesArray, 6)
  );

  const handleStartAnimation = useCallback(() => {
    if (isAnimating) return;

    const newWinningNumber = generateRandomNumber(1, 20);
    setResult(null);
    setWinningNumber(newWinningNumber);
    setIsAnimating(true);

    setRandomizedPrizes(generateRandomizedPrizes(primoPrizesArray, 6));

    setTimeout(() => {
      setIsAnimating(false);
    }, TIMER);
  }, [isAnimating]);

  const winningIndex = randomizedPrizes
    .map((num) => num.id)
    .indexOf(winningNumber);

  const totalWidth = randomizedPrizes.length * prizeWidth;

  const targetX = -(
    winningIndex * prizeWidth -
    containerWidth / 2 +
    prizeWidth / 2
  );

  useEffect(() => {
    if (containerRef.current) {
      setInterval(() => {
        setContainerWidth(containerRef.current?.clientWidth || 0);
      }, 500);
    }
  }, []);

  return (
    <AppWrapper>
      <div
        className="flex items-center flex-col w-full space-y-[10px]"
        ref={containerRef}
      >
        <CaretDownFill size={25} />
        <PrimoGameMotionCard
          isAnimating={isAnimating}
          totalWidth={totalWidth}
          targetX={targetX}
          setResult={(e) => setResult(e)}
          setIsAnimating={(e) => setIsAnimating(e)}
          winningNumber={winningNumber}
        >
          {randomizedPrizes.map((number, index) => (
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
