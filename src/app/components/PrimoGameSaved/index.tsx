import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AppWrapper } from "../AppWrapper";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function PrimoGameSaved() {
  const [winningNumber, setWinningNumber] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, setWinner] = useState(false);
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const pickedAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Set container width dynamically
    if (containerRef.current) {
      setContainerWidth(containerRef.current?.offsetWidth || 0);
    }
  }, [containerRef.current?.offsetWidth]);

  const handleStartAnimation = useCallback(() => {
    if (isAnimating) return;
    spinAudioRef.current?.play().then();

    setWinner(false);
    const newWinningNumber = generateRandomNumber(1, 20);
    setWinningNumber(newWinningNumber);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  }, [isAnimating]);

  const itemWidth = 250; // width of each item
  const winningIndex = numbers.map((num) => num.id).indexOf(winningNumber);
  const totalWidth = numbers.length * itemWidth;
  const targetX = -(
    winningIndex * itemWidth -
    containerWidth / 2 +
    itemWidth / 2
  );

  return (
    <AppWrapper>
      <div className="flex items-center flex-col space-y-[10px]">
        <CaretDownFill size={25} />
        <div
          className="overflow-hidden w-full relative h-[250px]"
          ref={containerRef}
        >
          {(winningNumber !== 0 || isAnimating) && (
            <motion.div
              className="h-[250px]"
              initial={{ x: 0 }}
              animate={{ x: isAnimating ? -totalWidth / 2 : targetX }}
              transition={{ duration: 2.75, ease: "easeOut" }}
              onAnimationComplete={() => {
                containerRef.current!.scrollTo({
                  left: targetX,
                  behavior: "smooth",
                });
                isAnimating &&
                  setTimeout(() => {
                    spinAudioRef.current?.pause();
                    spinAudioRef.current!.currentTime = 0;
                    pickedAudioRef.current?.play().then();
                  }, 3000);
              }}
              style={{
                display: "flex",
                width: `${totalWidth * 3}px`, // Triple width to simulate infinite loop
              }}
            >
              {[
                ...numbers,
                ...numbers,
                ...numbers,
                ...numbers,
                ...numbers,
                ...numbers,
              ].map((number, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center"
                  style={{
                    minWidth: `${itemWidth}px`,
                  }}
                >
                  {number.icon}
                </div>
              ))}
            </motion.div>
          )}
        </div>
        <CaretUpFill size={25} />
        <button
          onClick={handleStartAnimation}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          Start Animation
        </button>
        <audio ref={spinAudioRef}>
          <source src="/assets/spin.mp3" />
        </audio>
        <audio ref={pickedAudioRef}>
          <source src="/assets/picked.mp3" />
        </audio>
      </div>
    </AppWrapper>
  );
}
