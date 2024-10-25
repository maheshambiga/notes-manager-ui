import { useEffect, useState } from 'react';

export const usePersist = defaultValue => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('token') || defaultValue)
  );

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};
