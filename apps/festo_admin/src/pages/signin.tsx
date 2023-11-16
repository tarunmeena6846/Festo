import { Signin } from "ui";
import Appbar from "ui/components/AppBar";
import { useSession, signIn, getSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
function signin() {
  // console.log("tarun", );
  const router = useRouter();
  return (
    <div>
      <Appbar />
      <Signin
        onClick={async (username, password) => {
          console.log("tarun username in signin route", username);
          const response = await axios.post("/api/signin", {
            username,
            password,
          });
          console.log("tarun token is ", response.data.toke);
          localStorage.setItem("token", response.data.token);
          if (response.data.token) {
            router.push("/");
          }
        }}
      />
    </div>
  );
}
function handleRegister() {}
export default signin;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session }, // Add any props you need here
  };
};
