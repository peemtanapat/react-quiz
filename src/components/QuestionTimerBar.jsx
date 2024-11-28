import { useEffect, useState } from "react";

function QuestionTimerBar({ onTimeout, timeout, mode }) {
  const [checkAnsRemainTime, setCheckAnsRemainTime] = useState(timeout);

  useEffect(() => {
    const timeoutRef = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timeoutRef);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setCheckAnsRemainTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  return <progress className={mode} value={checkAnsRemainTime} max={timeout} />;
}

export default QuestionTimerBar;
