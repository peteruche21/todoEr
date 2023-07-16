import TodoErDB from "@/db/client";
import { ITodEr } from "@/types";
import { useForm } from "react-hook-form";
import { useAuth, useIsAuthenticated } from "@polybase/react";
import { encrypt } from "@/db/utils";

const Form = ({ update, data }: { update: boolean; data?: ITodEr }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string; description?: string }>();
  const { auth, state } = useAuth();

  const genId = (salt: string) => {
    const gen = performance.now();
    const random = gen + Math.random().toString().slice(5) + salt;
    return random;
  };

  const db = () => {
    TodoErDB.signer(async (data) => {
      return {
        h: "eth-personal-sign",
        sig: await auth.ethPersonalSign(data),
      };
    });
    return TodoErDB;
  };

  const onSubmit = async (dataInnner: { title: string; description?: string }) => {
    console.log(data, dataInnner);
    dataInnner.title = await encrypt(dataInnner.title);
    dataInnner.description = await encrypt(dataInnner.description || "");
    await auth.signIn();
    if (update) {
      data &&
        (await db()
          .collection("TodoEr")
          .record(data.id)
          .call("updateTask", [dataInnner.title, dataInnner.description || ""]));
    } else {
      state?.userId &&
        (await db()
          .collection("TodoEr")
          .create([genId("td"), state.userId, dataInnner.title, dataInnner?.description || ""]));
    }
    reset();
  };

  return (
    <div className="flex">
      <div className="gap-5 mx-auto text-neutral-600">
        <div className="text-center text-[18px] font-normal pb-8">
          {update ? "Update your TODO" : "Create a new TODO"}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full flex gap-5">
            <input
              type="text"
              id="title"
              placeholder="enter a title"
              className={`input input-bordered w-full ${errors.title && "border-red-500"}`}
              {...register("title", { required: true, value: data?.title })}
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-red-500 text-xs">please provide a title</span>
              </label>
            )}
            <textarea
              id="description"
              placeholder="description"
              className={`textarea textarea-bordered w-full ${errors.description && "border-red-500"}`}
              {...register("description", { required: false, value: data?.description })}
            />
            <div className="mx-auto">
              <button type="submit" className="btn btn-wide">
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
