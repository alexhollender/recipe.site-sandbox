'use client';
import * as React from 'react';
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
    <PauseIcon />
  ) : seconds === 0 ? (
    <ResetIcon />
  ) : (
    <StartIcon />
  );

  return { seconds, handleTimer, icon };
};

const Timer: React.FC<{ minutes: number }> = ({ minutes }) => {
  const { seconds, handleTimer, icon } = useTimer(minutes);

  return (
    <button
      className="w-fit flex items-center gap-x-1 z-10 mt-1 hover:opacity-75 transition-opacity"
      onClick={handleTimer}
      data-off={!seconds}
    >
      <span className="w-4 h-4">{icon}</span>
      <div className="text-text">{formatSeconds(seconds)}</div>
    </button>
  );
};

export default Timer;

const StartIcon: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="play">
      <g id="play_arrow_FILL1_wght400_GRAD0_opsz48">
        <path id="Path" d="M7.85712 38V2L36.1428 20L7.85712 38Z" fill="black" />
      </g>
    </g>
  </svg>
);

const PauseIcon: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="pause">
      <path id="Vector" d="M24.0325 35V5H33.1006V35H24.0325ZM6 35V5H15.0828V35H6Z" fill="black" />
    </g>
  </svg>
);

const ResetIcon: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="reset">
      <path
        id="Vector"
        d="M19.5831 39C17.3031 39 15.163 38.5727 13.163 37.7183C11.163 36.8638 9.41666 35.6924 7.9239 34.2039C6.43111 32.7154 5.25975 30.976 4.4098 28.9856C3.55986 26.9952 3.13489 24.8592 3.13489 22.5775H7.55739C7.55739 25.9198 8.72424 28.7507 11.0579 31.0701C13.3916 33.3896 16.2278 34.5493 19.5665 34.5493C22.8934 34.5493 25.7213 33.3847 28.0501 31.0555C30.3789 28.7263 31.5434 25.8956 31.5434 22.5634C31.5434 19.221 30.403 16.3902 28.1223 14.0707C25.8416 11.7513 23.0242 10.5915 19.6701 10.5915H18.9236L21.5715 13.2394L19.2194 15.6197L11.9237 8.29574L19.2194 1L21.5715 3.39434L18.7968 6.14086H19.5293C21.8197 6.14086 23.9651 6.56808 25.9654 7.42253C27.9657 8.27698 29.7123 9.44835 31.2053 10.9366C32.6983 12.4249 33.872 14.1638 34.7265 16.1533C35.5809 18.1428 36.0081 20.2766 36.0081 22.5547C36.0081 24.8328 35.583 26.9708 34.7327 28.9687C33.8823 30.9667 32.7105 32.7127 31.2171 34.2068C29.7237 35.7008 27.9814 36.8732 25.9901 37.7239C23.9988 38.5747 21.8632 39 19.5831 39Z"
        fill="black"
      />
    </g>
  </svg>
);
