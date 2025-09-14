import { useState, useEffect } from "react";

type CountdownTimerProps = {
  initialMinutes: number;
  initialSeconds: number;
  setIsCountingdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes = 10,
  initialSeconds = 0,
  setIsCountingdown,
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(countdownInterval);
          setIsCountingdown(false);
        }
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [minutes, seconds]);

  return (
    <span className="text-secondary-dark font-subHeading2">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
};

export default CountdownTimer;
