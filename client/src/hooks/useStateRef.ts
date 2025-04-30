import { useRef, useState } from 'react';

export function useStateRef<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const ref = useRef<T>(value);

  const setValueWithRef = (newValue: T) => {
    ref.current = newValue;
    setValue(newValue);
  };

  return [value, setValueWithRef, ref] as const;
} 