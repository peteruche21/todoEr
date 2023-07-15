import { create } from "zustand";
import { ITodoView } from "@/types";
import { useState, useEffect } from "react";

export const useTodoViewStore = create<ITodoView>()((set) => ({
  view: "all",
  setView: (view) => set({ view }),
}));

export const useStore = <T, F>(store: (callback: (state: T) => unknown) => unknown, callback: (state: T) => F) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
