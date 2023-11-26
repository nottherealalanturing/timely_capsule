import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ unveilingDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const remaining = unveilingDate - now;
    return Math.max(0, remaining);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  }

  return (
    <div>
      {timeRemaining > 0 ? (
        <p>This message will be unveiled in: {formatTime(timeRemaining)}</p>
      ) : (
        <p>The message has been unveiled!</p>
      )}
    </div>
  );
};

export default CountdownTimer;
