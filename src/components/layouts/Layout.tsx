import { JSX } from 'react'
import { Grid } from "@mui/material";

interface LayoutProps {
  aside: JSX.Element;
  main: JSX.Element;
}

const Layout = ({ aside, main }: LayoutProps) => {
  return (
    <Grid container>
      <Grid size={{ md: 3 }}>
        {aside}
      </Grid>
      <Grid size={{ md: 9 }}>
        {main}
      </Grid>
    </Grid>
  );
};

export default Layout;