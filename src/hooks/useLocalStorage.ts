import { useEffect, useState } from "react";

const PREFIX = "codepen-clone-";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue) as T;

    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue] as const;
}
