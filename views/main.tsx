"use client";

import { useState } from "react";
import Login from "./login";
import Create from "@/components/UI/Create";
import Modal from "@/components/UI/Modal";
import Form from "@/components/UI/Form";
import TaskCard from "@/components/UI/TaskCard";

const Main = () => {
  const [valid, setValid] = useState<"yes" | "no" | null>("no");
  const [view, setView] = useState<"all" | "completed" | "un-completed">("all");

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
            <div className="columns-1 gap-5 lg:columns-2">
              <TaskCard
                data={{
                  id: "1",
                  title: "title",
                  description:
                    "lorem ipsum dolor sit amet ignadum creatun ebgundum siter amet go and sit down let us try to make this very very long to see if it will work",
                  complete: false,
                }}
              />
              <TaskCard
                data={{
                  id: "2",
                  title: "title",
                  description: "lorem ipsum dolor sit amet ignadum creatun ebgundum siter amet go and sit down",
                  complete: true,
                }}
              />
              <TaskCard
                data={{
                  id: "3",
                  title: "title",
                  description: "lorem ipsum dolor sit amet ignadum creatun ebgundum siter amet go and sit down",
                  complete: false,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="m-auto">
          <Login valid={valid} />
        </div>
      )}
    </div>
  );
};

export default Main;
