import { Polybase } from "@polybase/client";
import { schema } from "./schema";

const TodoErDB = new Polybase({
  defaultNamespace: "TodoEr",
});

TodoErDB.applySchema(schema);

export default TodoErDB;
