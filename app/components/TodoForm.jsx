import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function TodoForm() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const [content, setContent] = useState("");

  const addTodo = async (event) => {
    event.preventDefault();
    if (content === "") return;
    const { data, error } = await supabase
      .from("todo")
      .insert([{ content: content }]);
    if (error) {
      console.error("Error adding todo: ", error);
    } else {
      console.log("Todo added successfully: ", data);
    }
  };

  return (
    <form className="mb-6" onSubmit={addTodo}>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2 text-white">
          Content
        </label>
        <input
          type="text"
          id="content"
          name="content"
          className="w-full px-3 py-2 text-white bg-[#7ABA78] border border-gray-600 rounded shadow appearance-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-[#1A4D2E] rounded hover:bg-gray-300 hover:text-black"
      >
        Add Watch
      </button>
    </form>
  );
}
