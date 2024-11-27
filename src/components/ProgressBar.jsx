import { useEffect, useState } from "react";

export default function ProgressBar({ timeout }) {
  const [checkAnsRemainTime, setCheckAnsRemainTime] = useState(timeout);

  useEffect(() => {
    const checkAnswerInterval = setInterval(() => {
      setCheckAnsRemainTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(checkAnswerInterval);
    };
  }, []);

  return <progress value={checkAnsRemainTime} max={timeout} />;
}
