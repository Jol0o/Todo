"use client";
import { useEffect, useState } from "react";
import EditWatch from "../components/EditTodo";
import WatchForm from "../components/TodoForm";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const { data: todos, error } = await supabase.from("todo").select("*");

        if (error) {
          throw error;
        }

        setTodos(todos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error.message);
        setLoading(false);
      }
    };

    fetchData();

    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todo" },
        () => {
          fetchData(); // Fetch updated todos when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  const deleteTodo = async (id) => {
    console.log("Deleting todo with id: ", id);
    const { error } = await supabase.from("todo").delete().eq("id", id);
    if (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  return (
    <div className="min-h-screen text-gray-300 bg-[#0A6847]">
      <div className="container p-6 mx-auto sm:p-12">
        <div className="flex items-start justify-between">
          <h1 className="mb-6 text-5xl font-extrabold text-white md:text-6xl">
            My Todo List
          </h1>
        </div>
        <WatchForm />
        <div className="mt-6">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="p-4 mb-4 bg-[#7ABA78] rounded-lg shadow"
            >
              <h2 className="mb-2 text-xl text-white">{todo.content}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <EditWatch todo={todo} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
