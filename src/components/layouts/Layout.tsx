import { JSX } from 'react'
import { Grid } from "@mui/material";

interface LayoutProps {
  aside: JSX.Element;
  main: JSX.Element;
}

const Layout = ({ aside, main }: LayoutProps) => {
  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: 5, lg: 4, xl: 3 }}>
        {aside}
      </Grid>
      <Grid size={{ xs: 12, md: 7, lg: 8, xl: 9 }}>
        {main}
      </Grid>
    </Grid>
  );
};

export default Layout;