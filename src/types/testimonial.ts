export type Testimonial = {
  id: number;
  name: string;
  designation: string | null;
  city: string;
  rating: number;
  content: string;
  image: string | null;
};

export type TestimonialApiResponse = {
  success: boolean;
  message: string;
  data: Testimonial[];
  total: number;
};