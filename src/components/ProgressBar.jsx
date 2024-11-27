import { useEffect, useState } from "react";
import { TIMEOUT_MS } from "./Quiz";

export default function ProgressBar() {
  const [checkAnsRemainTime, setCheckAnsRemainTime] = useState(TIMEOUT_MS);

  useEffect(() => {
    const checkAnswerInterval = setInterval(() => {
      setCheckAnsRemainTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(checkAnswerInterval);
    };
  }, []);

  return <progress value={checkAnsRemainTime} max={TIMEOUT_MS} />;
}
