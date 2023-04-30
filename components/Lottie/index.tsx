import React, { useEffect, useRef } from "react";

import lottie from "lottie-web";

interface LottieProps {
  animationData: any;
  loop: boolean;
  autoplay: boolean;
}

export const Lottie = ({ animationData, loop, autoplay }: LottieProps) => {
  const element = useRef<HTMLDivElement>(null);
  const lottieInstance = useRef<any>();

  useEffect(() => {
    if (element.current) {
      lottieInstance.current = lottie.loadAnimation({
        animationData,
        loop,
        autoplay,
        container: element.current,
      });
    }
    return () => {
      lottieInstance.current?.destroy();
    };
  }, [animationData, autoplay, loop]);

  return <div ref={element}></div>;
};
