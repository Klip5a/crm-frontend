import { ChangeEvent, useEffect, useState } from "react";

export function useSearch(initialValue = "", delay: 300) {
  const [search, setSearch] = useState(initialValue);
  const [debounceSearch, setDebounceSearch] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearch(search);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [search, delay]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return { search, debounceSearch, onSearchChange };
}
