import { Snackbar as MUISnackbar, SnackbarCloseReason } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useReactiveVar } from "@apollo/client";
import { snackVar } from "../../constants/snack";

const Snackbar = () => {
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <MUISnackbar
          open={!!snack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snack.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snack.message}
          </Alert>
        </MUISnackbar>
      )}
    </>
  );
}

export default Snackbar;