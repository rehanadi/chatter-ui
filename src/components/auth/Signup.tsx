import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth"
import { useCreateUser } from "../../hooks/useCreateUser";

const Signup = () => {
  const [createUser] = useCreateUser();

  interface SignupData {
    email: string;
    password: string;
  }

  const signupHandler = async ({ email, password }: SignupData) => {
    await createUser({
      variables: {
        createUserInput: {
          email,
          password,
        },
      },
    });
  };

  return (
    <Auth
      submitLabel="Signup"
      onSubmit={signupHandler}
    >
      <Link
        to="/login"
        style={{ alignSelf: "center", textDecoration: "none" }}
      >
        <MUILink>
          Login
        </MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;