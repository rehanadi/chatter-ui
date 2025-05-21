import { Avatar, Button, Stack, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useGetMe } from "../../hooks/useGetMe";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";
import { commonFetch } from "../../utils/fetch";

const Profile = () => {
  const me = useGetMe();

  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("file", file); // Match with file interceptor name in the backend

      const res = await commonFetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      snackVar({
        message: "Image uploaded successfully",
        type: "success",
      });
    } catch (err) {
      snackVar({
        message: "Error uploading image",
        type: "error",
      });
    }
  };

  return (
    <Stack
      spacing={6}
      sx={{
        marginTop: "2.5rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1">
        {me.data?.me.username}
      </Typography>
      <Avatar
        src={me.data?.me.imageUrl}
        sx={{
          width: 256,
          height: 256,
        }}
      />
      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
      >
        Upload Image
        <input
          type="file"
          hidden
          onChange={handleFileUpload}
        />
      </Button>
    </Stack>
  );
};

export default Profile;