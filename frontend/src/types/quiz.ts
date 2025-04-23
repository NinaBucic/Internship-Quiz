export type Quiz = {
  id: string;
  title: string;
  category: {
    title: string;
    imageUrl?: string;
  };
};
