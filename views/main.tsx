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
import { useStore, useTodoViewStore } from "@/store";
import { isHolderOfCollection } from "../utils/nftApi";

const Main = () => {
  const polybase = usePolybase();
  const { data, error, loading } = useCollection<ITodEr>(polybase.collection("TodoEr"));
  const [valid, setValid] = useState<"yes" | "no" | null>(null);
  const view = useStore(useTodoViewStore, (state) => state.view);
  const [authState, setAuthState] = useState<AuthState>();

  useEffect(() => {
    holder();
  }, [authState?.userId]);

  const holder = async () => {
    if (!authState?.userId) return;
    const isHolder = await isHolderOfCollection(authState?.userId);
    setValid(isHolder ? "yes" : "no");
  };

  const getTodos = (): JSX.Element[] | undefined => {
    const todoArr = data?.data.map((todo) => todo.data);
    switch (view) {
      case "completed":
        return todoArr?.filter((todo) => todo.complete).map((todo) => <TaskCard key={todo.id} data={todo} />);
      case "un-completed":
        return todoArr?.filter((todo) => !todo.complete).map((todo) => <TaskCard key={todo.id} data={todo} />);
      default:
        return todoArr?.map((todo) => <TaskCard key={todo.id} data={todo} />);
    }
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
            {data?.data.length == 0 && !loading && <div>No tasks</div>}
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
