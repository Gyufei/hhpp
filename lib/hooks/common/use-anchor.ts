import { useEffect, useState } from "react";

export function useAnchor() {
  const [anchor, setAnchor] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setAnchor(window.location.hash.substring(1));
    };

    window.addEventListener("hashchange", handleHashChange);

    setAnchor(window.location.hash.substring(1));

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const setAnchorValue = (value: string) => {
    window.location.hash = value;
  };

  return {
    anchor,
    setAnchorValue,
  };
}
