import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-300 bg-gray-900">
      <div className="container p-6 mx-auto sm:p-12">
        <h1 className="mb-6 text-5xl font-extrabold text-white md:text-6xl">
          Welcome to Watch List
        </h1>
        <p className="mb-6 text-lg text-white md:text-xl">
          Your personal space to curate and manage a wishlist of your favorite
          watches. Sign in to create, view, edit, and delete items from your
          watchlist.
        </p>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
