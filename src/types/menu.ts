export type MenuAttributeValue = {
  name: string;
  slug: string;
};

export type MenuAttribute = {
  title: string;
  slug: string;
  values: MenuAttributeValue[];
};

export type MenuCategory = {
  title: string;
  category_slug: string;
  category_image: string;
  attributes: MenuAttribute[];
};

export type MenuApiResponse = {
  status: boolean;
  message: string;
  data: MenuCategory[];
};