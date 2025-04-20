'use client';
import { useActionState, useEffect, useRef } from "react";
import { addFedd } from "@/actions/feed-form-action";
import { toast } from "sonner";

const FeedForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch, pending] = useActionState(addFedd, {
    errors: [],
    success: "",
    feedData: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      localStorage.setItem("feedData", state.feedData);
      ref.current?.reset();
    }

    if (state.errors.length > 0) {
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state]);

  return (
    <form
      ref={ref}
      noValidate
      className="flex flex-col gap-4 mt-8 w-full max-w-md mx-auto"
      action={dispatch}
    >
      <input
        type="url"
        placeholder="Añadir URL del Feed RSS"
        className="p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
        name="url"
        disabled={pending}
      />
      <button
        type="submit"
        className="bg-accent text-white px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300 flex items-center justify-center"
        disabled={pending}
      >
        {pending ? (
          <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
        ) : (
          "Añadir Feed"
        )}
      </button>
    </form>
  );
};

export default FeedForm;
