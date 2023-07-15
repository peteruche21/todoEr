"use client";

import { useState } from "react";
import Login from "./login";
import Create from "@/components/UI/Create";
import Modal from "@/components/UI/Modal";
import Form from "@/components/UI/Form";

const Main = () => {
  const [valid, setValid] = useState<"yes" | "no" | null>("yes");
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
            <h2 className="uppercase font-medium text-sm my-3 text-gray-400">you are connected</h2>
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
