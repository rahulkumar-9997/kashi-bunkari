export type Faq = {
  id: number;
  question: string;
  answer: string;
  answer_image: string | null;
};

export type FaqApiResponse = {
  status: boolean;
  message: string;
  data: Faq[];
};