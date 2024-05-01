import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EditTodo({ todo }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    content: todo.content,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateTodo = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from("todo")
      .update({ content: formData.content })
      .match({ id: todo.id });
    if (error) {
      console.error("Error updating todo: ", error);
    } else {
      console.log("Todo updated successfully: ", data);
      setShowModal(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Edit
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center px-4 bg-[#0A6847] bg-opacity-75">
          <div className="w-full max-w-md p-6 bg-[#7ABA78] rounded-lg modal-content">
            <span
              className="float-right text-xl leading-none text-white cursor-pointer close hover:text-[#0A6847]"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <form onSubmit={updateTodo} className="mt-4">
              <input type="hidden" name="id" value={todo.id} />
              <div className="mb-4">
                <label htmlFor="content" className="block mb-2 text-[#0A6847]">
                  Content
                </label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full p-2 text-white bg-gray-800 border border-gray-700 rounded focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-[#1A4D2E] rounded hover:bg-blue-700"
              >
                Update Todo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
