interface User {
  id: number;
  username: string;
  avatar_url: string;
}

export interface Comment {
  id: number;
  content: string;
  score: number;
  replying_to: number;
  created_at: string;
  user: User;
}

export interface Score {
  score: number
}

export interface Token {
  exp: number;
  iat: number;
  id: number;
}