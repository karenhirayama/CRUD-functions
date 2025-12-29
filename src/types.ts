export interface Post {
  id: string;
  title: string;
  content: string;
  username: string;
  created_datetime: string;
  likes?: number;
  likedBy?: string[];
}

export interface NewPost {
  title: string;
  content: string;
  username: string;
}

export interface UpdatePost {
  title: string;
  content: string;
}
