'use client';
import React, { useState, useEffect, useMemo } from 'react';

const CountdownTimer = ({ date }) => {
  const targetDate = useMemo(() => new Date(date), [date]);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const timeLeft = targetDate.getTime() - now;

      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
        return;
      }

      setTimeLeft(timeLeft);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate, timeLeft]);

  if (timeLeft === null) {
    return;
  }

  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span>
      <span>Hours: {hours} </span>
      <span>Minutes: {minutes} </span>
      <span>Seconds: {seconds} </span>
    </span>
  );
};

export default CountdownTimer;
