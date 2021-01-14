import axios from "axios";

interface CommentTimestamp {
  title: string;
  text: string;
  video_id: string;
  timestamp: number;
}

export const postCommentTimestamp = async (comments: CommentTimestamp) => {
  return await axios.post("/api/comments/post", comments);
};
