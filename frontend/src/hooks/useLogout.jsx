import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/auth/logout`, {
        withCredentials: true,
      });
      const data = response.data; // Axios parses JSON automatically
      if (data.error) {
        throw new Error(data.error);
      }

      // Clear user data
      if (data.success) localStorage.removeItem("jwt"); // Clear JWT from local storage
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message); // Display error
    } finally {
      setLoading(false); // Manage loading state
    }
  };

  return { loading, logout };
};
export default useLogout;
