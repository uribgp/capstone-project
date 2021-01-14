import axios from "axios";
export const commentGeneral = async (comment: string, videoId: number) => {
  return await axios.post("/comments", { comment });
};
