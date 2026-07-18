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

export type MenuSectionItem = {
  title: string;
  slug: string;
};

export type MenuSection = {
  title: string;
  slug: string;
  items: MenuSectionItem[];
};

export type MenuData = {
  categories: MenuCategory[];
  sections: MenuSection[];
};

export type MenuApiResponse = {
  status: boolean;
  message: string;
  data: MenuData;
};