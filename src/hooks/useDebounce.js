import { useEffect, useState } from "react";

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 600);

    return () => {
      clearTimeout(timerId);
    };
  });

  return debouncedValue;
};

export default useDebounce;
