export type SearchSuggestionTextItem = {
  type: "suggestion";
  title: string;
  image: string | null;
};

export type SearchSuggestionProductItem = {
  type: "product";
  title: string;
  slug: string;
  attributes_value_slug: string;
  category: string;
  offer_rate: number | null;
  image: string | null;
};

export type SearchSuggestionItem = SearchSuggestionTextItem | SearchSuggestionProductItem;

export type SearchSuggestionApiResponse = {
  suggestions: SearchSuggestionItem[];
};