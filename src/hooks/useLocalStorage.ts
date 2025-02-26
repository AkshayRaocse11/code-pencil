import { useEffect, useState } from "react";

const PREFIX = "codepen-pencil-";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    // Check if window and localStorage are available (client-side)
    if (typeof window === "undefined") {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }

    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue) as T;

    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    }
  }, [prefixedKey, value]);

  return [value, setValue] as const;
}
