import { PublicKey } from "@polybase/client";

export interface ITodEr {
  id: string;
  title: string;
  address: string;
  description?: string;
  complete: boolean;
  owner?: PublicKey;
}

export interface ITodoView {
  view: "all" | "completed" | "un-completed";
  setView: (view: "all" | "completed" | "un-completed") => void;
}
