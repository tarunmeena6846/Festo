// pages/protected.tsx

import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Protected() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <p>You are not authenticated</p>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
