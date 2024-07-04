import { useSession, signIn, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <h1 className="text-2xl">Event App</h1>
      </div>
      <div>
        {session ? (
          <>
            <p className="inline-block mr-4">Welcome, {session.user?.name}</p>
            <button
              className="bg-red-500 p-2 rounded"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            className="bg-green-500 p-2 rounded"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
}
