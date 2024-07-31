import { PrimoResults, TIMER } from "../../../helpers/primoGameRules.ts";
import { ReactNode, useCallback, useRef } from "react";
import { motion } from "framer-motion";

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
  const pickedAudioRef = useRef<HTMLAudioElement | null>(null);

  const isPrime = useCallback((num: number) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
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
          animate={{ x: isAnimating ? -totalWidth : targetX }}
          transition={{ duration: 1, ease: "easeInOut" }} // Adjusted the duration to 1 second
          onAnimationComplete={() => {
            containerRef.current!.scrollTo({
              left: targetX,
              behavior: "smooth",
            });
            setTimeout(() => {
              pickedAudioRef.current?.play().then();
              setIsAnimating(false);
              setResult(
                isPrime(winningNumber) ? PrimoResults.Won : PrimoResults.Lost
              );
            }, TIMER);
          }}
          style={{
            display: "flex",
            width: `${totalWidth * 3}px`, // Triple width to simulate infinite loop
          }}
        >
          {children}
        </motion.div>
      </div>
      <audio ref={pickedAudioRef}>
        <source src="/assets/picked.mp3" />
      </audio>
    </>
  );
}
