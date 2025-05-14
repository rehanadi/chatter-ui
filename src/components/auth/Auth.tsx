import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  error?: string;
}

const Auth = ({ submitLabel, onSubmit, children, error }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack
      spacing={3}
      sx={{
        justifyContent: "center",
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "30%",
        },
        margin: "0 auto",
      }}
    >
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button
        variant="contained"
        onClick={() => onSubmit({ email, password })}
      >
        {submitLabel}
      </Button>
      {children}
    </Stack>
  );
};

export default Auth;