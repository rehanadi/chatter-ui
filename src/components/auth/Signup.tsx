import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth"
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [error, setError] = useState("");

  interface SignupData {
    email: string;
    password: string;
  }

  const errorHandler = (errors: any) => {
    const errorMessage = extractErrorMessage(errors);

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError("An unknown error occurred.");
  };

  const signupHandler = async ({ email, password }: SignupData) => {
    try {
      setError("");
      const res = await createUser({
        variables: {
          createUserInput: {
            email,
            password,
          },
        },
      });

      if (res.errors) {
        errorHandler(res.errors);
      }
    } catch (err) {
      errorHandler(err);
    }
  };

  return (
    <Auth
      submitLabel="Signup"
      onSubmit={signupHandler}
      error={error}
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