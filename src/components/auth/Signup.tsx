import { Link } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import Auth from "./Auth"

const Signup = () => {
  return (
    <Auth
      submitLabel="Signup"
      onSubmit={async () => {}}
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