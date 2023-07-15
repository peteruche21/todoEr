import { useForm } from "react-hook-form";

const Form = ({ update }: { update: boolean }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string; description?: string }>();

  const onSubmit = async (data: { title: string; description?: string }) => {
    console.log(data);
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
              {...register("title", { required: true })}
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-red-500 text-xs">please provide a title</span>
              </label>
            )}
            <input
              type="text"
              id="description"
              placeholder="description"
              className={`input input-bordered w-full ${errors.description && "border-red-500"}`}
              {...register("description", { required: false })}
            />
            <div className="mx-auto">
              <button type={"submit"} className="btn btn-wide">
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
