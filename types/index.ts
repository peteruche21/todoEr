import { PublicKey } from "@polybase/client";

interface ITodEr {
  id: string;
  title: string;
  description?: string;
  complete: boolean;
  owner: PublicKey;
}
