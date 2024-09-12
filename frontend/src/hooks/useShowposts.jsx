import { useState } from "react";
import axios from "axios";
const useShowposts = () => {
  const [loading, setLoading] = useState(false);

  const showPosts = async () => {
    setLoading(true);
    try {
     
      
      const response = await axios.get(
        `/api/post/allposts`,
        { withCredentials: true }        
      );

      const data = response.data; // Axios parses the response automatically
      
      return data?.allposts; // Return the relevant part of the data
    } catch (error) {
      console.error(error.message); // Display error message
    } finally {
      setLoading(false); // Always execute after request completion
    }
  };

  return { loading, showPosts };
};
export default useShowposts;
