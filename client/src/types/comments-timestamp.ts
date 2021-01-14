import { CommentVote } from "./comment-vote";

export interface CommentsTimestamp {
  created_at: string; 
  id: number; 
  text: string; 
  timestamp: number;
  title: string; 
  comment_avatar: string; 
  coach: boolean; 
  comment_user: string; 
  formatted_timestamp: string; 
  likes: number; 
  like_status: CommentVote;
}