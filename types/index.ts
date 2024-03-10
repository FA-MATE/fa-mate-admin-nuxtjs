export type CategoryType = {
  id?: number;
  name: string;
  orderNo: number;
  subCategories: SubCategoryType[]
};

export type SubCategoryType = {
  id?: number;
  categoryId: number;
  name: string;
  orderNo: number;
};
