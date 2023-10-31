import { Signin } from "ui";
import Button from "@mui/material/Button";
import { Card, Typography } from "@mui/material";
import Appbar from "ui/components/AppBar";
import { useSession, signIn, signOut } from "next-auth/react";

function signin() {
  //   console.log(Signup)
  // const session = useSession();

  // if (session) {
  //   console.log("tarun");
  //   console.log(session.data?.user?.name);
  // } else {
  //   console.log("meena");
  // }

  return (
    <div>
      <Appbar />
      <Signin
        onClick={(username, password) => {
          alert(username);
        }}
      />
    </div>
  );
}
function handleRegister() {}
export default signin;
