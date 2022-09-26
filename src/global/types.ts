export type TCategory = {
  _id: string;
  title: string;
  englishTitle: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type TBlog = {
  status: number;
  commentsCount: number;
  likesCount: number;
  isBookmarked: boolean;
  isLiked: boolean;
  coverImage: string;
  tags: any[];
  related: any[];
  comments: any[];
  _id: string;
  title: string;
  titleBrief: string;
  slug: string;
  hashId: string;
  briefText: string;
  readingTime: number;
  text: string;
  author: TAuthor;
  category: TBlogCategory;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type TPaginateDetail = {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type TBlogCategory = {
  _id: string;
  title: string;
  englishTitle: string;
};

export type TAuthor = {
  biography: string;
  _id: string;
  name: string;
};

export type TComment = {
  _id: string;
  postId: string;
  responseTo: string | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  status: number;
  writer: TWriter;
  __v: number;
};

export type TWriter = {
  _id: string;
  name: string;
};
