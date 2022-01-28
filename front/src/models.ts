interface User {
  id: number;
  username: string;
  avatar_url: string;
}

export interface Comment {
  id: number;
  content: string;
  score: number;
  replyingTo: number;
  createdAt: string;
  user: User;
}