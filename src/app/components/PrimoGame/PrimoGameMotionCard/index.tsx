import {
  PrimoResults,
  prizeWidth,
  TIMER,
} from "../../../helpers/primoGameRules.ts";
import { ReactNode, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { CheckIsPrime } from "../../../helpers/CheckIsPrime.tsx";

interface Props {
  isAnimating: boolean;
  totalWidth: number;
  targetX: number;
  setResult: (result: PrimoResults) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  children: ReactNode | ReactNode[];
  winningNumber: number;
}

export function PrimoGameMotionCard({
  setResult,
  totalWidth,
  setIsAnimating,
  isAnimating,
  targetX,
  winningNumber,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const winnerAudioRef = useRef<HTMLAudioElement | null>(null);
  const loserAudioRef = useRef<HTMLAudioElement | null>(null);
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const isPrime = CheckIsPrime();

  const animationCompleteFn = useCallback(() => {
    setTimeout(() => {
      isPrime(winningNumber)
        ? winnerAudioRef.current?.play().then()
        : loserAudioRef.current?.play().then();
      setIsAnimating(false);
      setResult(isPrime(winningNumber) ? PrimoResults.Won : PrimoResults.Lost);
    }, TIMER);
  }, [isPrime, setIsAnimating, setResult, winningNumber]);

  const lastPositionRef = useRef(0);

  const handleUpdate = useCallback((latest: { x: number }) => {
    const currentPosition = Math.abs(latest.x);
    const blockIndex = Math.floor(currentPosition / prizeWidth);
    const lastBlockIndex = Math.floor(lastPositionRef.current / prizeWidth);

    if (blockIndex !== lastBlockIndex) {
      spinAudioRef.current?.play().then();
    }
    lastPositionRef.current = currentPosition;
  }, []);

  if (winningNumber === 0 && !isAnimating) return <div className="h-[250px]" />;

  return (
    <>
      <div
        className="overflow-x-hidden w-full relative h-[250px] rounded-[12px]"
        ref={containerRef}
      >
        <motion.div
          className="h-[250px]"
          initial={{ x: 0 }}
          animate={{ x: targetX }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onUpdate={handleUpdate}
          onAnimationComplete={animationCompleteFn}
          style={{
            display: "flex",
            width: `${totalWidth * 2}px`,
          }}
        >
          {children}
        </motion.div>
      </div>
      <audio ref={spinAudioRef}>
        <source src="/assets/spin.mp3" />
      </audio>
      <audio ref={winnerAudioRef}>
        <source src="/assets/win.mp3" />
      </audio>
      <audio ref={loserAudioRef}>
        <source src="/assets/lose.mp3" />
      </audio>
    </>
  );
}
