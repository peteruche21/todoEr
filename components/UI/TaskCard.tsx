import { ITodEr } from "@/types";
import Modal from "./Modal";
import Form from "./Form";
import { useAuth, useIsAuthenticated } from "@polybase/react";
import TodoErDB from "@/db/client";
import { useEffect, useState } from "react";
import { decrypt } from "@/db/utils";

const TaskCard = ({ data }: { data: ITodEr }) => {
  const { auth, state } = useAuth();
  const [dataInner, setDataInner] = useState<ITodEr>();

  const db = () => {
    TodoErDB.signer(async (data) => {
      return {
        h: "eth-personal-sign",
        sig: await auth.ethPersonalSign(data),
      };
    });
    return TodoErDB;
  };

  const decryptAndStore = async () => {
    if (!data) return;
    const description = await decrypt(data.description || "");
    setDataInner({ ...data, description });
  };

  useEffect(() => {
    decryptAndStore();
  }, [data]);

  const deleteTask = async (docid: string) => {
    await auth.signIn();
    await db().collection("TodoEr").record(docid).call("del");
  };

  const completeTask = async (docid: string) => {
    await auth.signIn();
    await db().collection("TodoEr").record(docid).call("completeTask");
  };

  return (
    <div className="card mb-8 max-w-[350px] break-inside-avoid shadow-xl dark:bg-neutral">
      <div className="card-body">
        <h2 className="card-title">{dataInner?.title}</h2>

        <p>{dataInner?.description}</p>
        <div className="card-actions btn-group absolute -bottom-3 left-5 justify-start gap-0">
          <label className="btn btn-sm" htmlFor={data.id}>
            <svg
              fill="currentColor"
              className="h-5 w-5 dark:text-white "
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
          </label>
          <button className="btn btn-sm" onClick={async () => await deleteTask(data.id)}>
            <svg
              fill="currentColor"
              className="h-5 w-5 dark:text-white "
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
              />
            </svg>
          </button>
          <button className="btn btn-sm" onClick={async () => await completeTask(data.id)}>
            <svg
              fill="currentColor"
              className={`h-5 w-5  ${data.complete ? "text-green-500" : "dark:text-white"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              />
            </svg>
          </button>
        </div>
      </div>
      <Modal modalId={data.id}>
        <Form update={true} data={dataInner} />
      </Modal>
    </div>
  );
};

export default TaskCard;
