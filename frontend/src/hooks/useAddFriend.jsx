import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
const useAddFriend = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const addFriend = async (id) => {
    setLoading(true);
    try {
      const api = await axios.post(
        `/api/user/addfriend`,
        { id }, // Pass the data directly
        { withCredentials: true }
      );
      const data = await api.data;
      console.log(data)
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const areFriend = async (id) => {
    setLoading(true);
    // console.log(id);
    try {
      const api = await axios.get(`/api/user/arefriend/${id}`, {
        withCredentials: true,
      });
      const data = api.data;
      return data;
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, addFriend, areFriend };
};
export default useAddFriend;
