import axios from "axios";

export const getPaintings = async (page: number, paintings_per_page: number) => {
  try {
    const response = await axios.get(
      `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${paintings_per_page}&fields=id,image_id,title,artist_title,is_public_domain`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Server error response:", error.response.data);
        throw error.response.data;
      } else {
        console.error("No response received:", error.message);
        throw new Error("No response from server");
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getSearchedPaintings = async (
  search: string,
  page: number,
  sort: string,
  paintings_per_page: number
) => {
  try {
    const response = await axios.get(
      `https://api.artic.edu/api/v1/artworks/search?query[match][title]=${search}&fields=id,image_id,title,artist_title,is_public_domain&page=${page}&limit=${paintings_per_page}&sort=${sort}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Server error response:", error.response.data);
        throw error.response.data;
      } else {
        console.error("No response received:", error.message);
        throw new Error("No response from server");
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
