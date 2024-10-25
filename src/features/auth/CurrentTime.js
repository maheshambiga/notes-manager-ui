import React, { useEffect, useState } from 'react';

const CurrentTime = () => {
  const [time, setTime] = useState(formatDate());

  function formatDate() {
    const date = new Date();

    const today = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(date);

    return today;
  }

  useEffect(() => {
    // Set interval to update time every second
    const intervalId = setInterval(() => {
      setTime(formatDate());
    }, 1000);

    // Cleanup the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return <p className="mb-8 mt-2">{time.toString()}</p>;
};

export default CurrentTime;
