import { forwardRef, useEffect, useRef, useState } from "react";

const QuestionTimerBar = forwardRef(function QuestionTimerBar(
  { onTimeout, timeout, clearPrevious = false },
  ref
) {
  const [checkAnsRemainTime, setCheckAnsRemainTime] = useState(timeout);

  useEffect(() => {
    console.log("SET_TIMEOUT " + onTimeout);

    const timeoutRef = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timeoutRef);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    console.log("SET_INTERVAL " + onTimeout);

    const intervalRef = setInterval(() => {
      setCheckAnsRemainTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  return <progress value={checkAnsRemainTime} max={timeout} />;
});

export default QuestionTimerBar;
