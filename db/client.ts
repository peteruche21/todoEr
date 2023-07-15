import { Polybase } from "@polybase/client";
import { schema } from "./schema";

const TodoErDB = new Polybase({
  defaultNamespace:
    "pk/0x98ef48d0398134355057b9a783739bebfd163fa3e7ffa06e13e2373e5eed468dc95e0fbd56501f823fe7d12e2b8652dd642fc9c534d00b2b2ec7e21faa9c8c58/todoEr",
});

export default TodoErDB;
