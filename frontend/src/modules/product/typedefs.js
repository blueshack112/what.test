export type KeywordListType = {
  keywords: string[],
};

export type KeywordListSWREntity = {
  data: KeywordListType,
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};

export type ProductType = {
  id: number,
  name: string,
  description: string,
  price: string,
  stock: number,
  slug: string,
};

export type ProductsSWREntity = {
  data: ProductType[],
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};
