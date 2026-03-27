export interface Post {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: TopComment;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
  image: string;
  liked: boolean
}

interface TopComment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  parentComment: null;
  likes: any[];
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
  email?: string;
  cover?: string
}
