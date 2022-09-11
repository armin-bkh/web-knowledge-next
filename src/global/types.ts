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
  category: {
    _id: string;
    title: string;
    englishTitle: string;
  };
};
