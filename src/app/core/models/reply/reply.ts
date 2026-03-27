export interface Reply {
  _id: string;
  content: string;
  image: string
  commentCreator: ReplyCreator; // لاحظ الاسم هنا من الـ API
  post: string;
  parentComment: string;
  createdAt: string;
  likesCount: number;
  isReply: boolean;
  id: string;
}

export interface ReplyCreator {
  _id: string;
  name: string;
  photo: string;
  username: string;
}
