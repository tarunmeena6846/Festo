import Signup from "ui/components/Signup";
import Appbar from "ui/components/AppBar";
import axios from "axios";
import { useRouter } from "next/router";
function signup() {
  const router = useRouter();
  return (
    <div>
      <Appbar />
      <Signup
        onClick={async (username, password) => {
          console.log("tarun username in signin route", username);
          const response = await axios.post("/api/signup", {
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
export default signup;
