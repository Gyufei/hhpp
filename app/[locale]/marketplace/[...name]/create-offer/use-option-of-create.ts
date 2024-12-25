import { useState } from "react";

export function useOptionOfCreate() {
  const [note, setNote] = useState("");

  return {
    note,
    setNote,
  };
}
