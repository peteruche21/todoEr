import { PublicKey } from "@polybase/client";

export interface ITodEr {
  id: string;
  title: string;
  address: string;
  description?: string;
  complete: boolean;
  owner?: PublicKey;
}
