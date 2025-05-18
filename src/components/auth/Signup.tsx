import { Link } from "react-router-dom";
import { Link as MUILink, TextField } from "@mui/material";
import Auth from "./Auth"
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { extractErrorMessage } from "../../utils/errors";
import { useLogin } from "../../hooks/useLogin";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";

const Signup = () => {
  const [createUser] = useCreateUser();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login } = useLogin();

  const errorHandler = (errors: any) => {
    const errorMessage = extractErrorMessage(errors);

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(UNKNOWN_ERROR_MESSAGE);
  };

  return (
    <Auth
      submitLabel="Signup"
      extraFields={[
        <TextField
          key="username"
          type="text"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
          helperText={error}
        />,
      ]}
      onSubmit={async ({ email, password }) => {
        try {
          setError("");

          const res = await createUser({
            variables: {
              createUserInput: {
                email,
                username,
                password,
              },
            },
          });

          if (res.errors) {
            errorHandler(res.errors);
          }

          await login({ email, password });
        } catch (err) {
          errorHandler(err);
        }
      }}
      error={error}
    >
      <Link
        to="/login"
        style={{ alignSelf: "center" }}
      >
        <MUILink sx={{ textDecoration: "none" }}>
          Login
        </MUILink>
      </Link>
    </Auth>
  );
};

export default Signup;