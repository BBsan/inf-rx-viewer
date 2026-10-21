import { useEffect, useState } from "react";

export default function useJsonStorage<T = any>(key: string, initialValue: T) {
  const [jsonValue, setJsonValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : initialValue;
    } catch (e: any) {
      console.log(e);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      const serialized = JSON.stringify(jsonValue);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.log(e);
    }
  }, [jsonValue]);
  return { jsonValue, setJsonValue };
}
