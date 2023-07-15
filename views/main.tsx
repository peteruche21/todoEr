"use client";

import { useEffect, useState } from "react";
import Login from "./login";
import Create from "@/components/UI/Create";
import Modal from "@/components/UI/Modal";
import Form from "@/components/UI/Form";
import TaskCard from "@/components/UI/TaskCard";
import { AuthState } from "@polybase/auth";
import LoginButton from "@/components/UI/LoginButton";
import { usePolybase, useCollection } from "@polybase/react";
import { ITodEr } from "@/types";
import Spinner from "@/components/UI/Loading";

const Main = () => {
  const polybase = usePolybase();
  const { data, error, loading } = useCollection<ITodEr>(polybase.collection("TodoEr"));
  const [valid, setValid] = useState<"yes" | "no" | null>("yes");
  const [view, setView] = useState<"all" | "completed" | "un-completed">("all");
  const [authState, setAuthState] = useState<AuthState>();

  const getTodos = (): JSX.Element[] | undefined => {
    return data?.data.map((todo) => {
      return <TaskCard key={todo.data.id} data={todo.data} />;
    });
  };

  return (
    <div className="flex w-full min-h-[70vh] pt-10 ">
      <Modal modalId="create-task">
        <Form update={false} />
      </Modal>
      {valid == "yes" ? (
        <div className="flex flex-col w-full gap-5">
          <div className="inline-flex justify-end">
            <Create />
          </div>
          <div className="mx-auto">
            <h2 className="uppercase font-medium text-sm my-3 text-gray-400 text-center"></h2>
            {loading && <Spinner />}
            {data && <div className="columns-1 gap-5 lg:columns-2">{getTodos()}</div>}
          </div>
        </div>
      ) : (
        <div className="m-auto">
          <Login valid={valid}>
            <LoginButton setAuthState={setAuthState} />
          </Login>
        </div>
      )}
    </div>
  );
};

export default Main;
