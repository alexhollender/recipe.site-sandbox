'use client';
import * as React from 'react';
import * as Ui from '@/ui';
import { formatSeconds } from '@/lib/utils';

const useTimer = (minutes: number) => {
  const [seconds, setSeconds] = React.useState<number>(minutes * 60);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isRunning) return;
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      if (seconds === 0) setIsRunning(false);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, seconds]);

  const handleTimer = (): void => {
    if (seconds === 0) {
      setSeconds(minutes * 60);
      setIsRunning(false);
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const icon: React.ReactNode = isRunning ? (
    <Ui.Icons.PauseTimer />
  ) : seconds === 0 ? (
    <Ui.Icons.ResetTimer />
  ) : (
    <Ui.Icons.StartTimer />
  );

  return { seconds, handleTimer, icon };
};

const Timer: React.FC<{ minutes: number }> = ({ minutes }) => {
  const { seconds, handleTimer, icon } = useTimer(minutes);

  return (
    <button
      className="w-fit flex items-center gap-x-1 z-10 mt-1 hover:opacity-60 transition-opacity"
      onClick={handleTimer}
      data-off={!seconds}
    >
      <span className="w-4 h-4">{icon}</span>
      <div className="text-text">{formatSeconds(seconds)}</div>
    </button>
  );
};

export default Timer;
