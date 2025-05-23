import { API_URL } from "../constants/urls";
import { commonFetch } from "../utils/fetch";

const useLogout = () => {
  const logout = async () => {
    const res = await commonFetch(`${API_URL}/auth/logout`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }
  }

  return { logout };
};

export { useLogout };