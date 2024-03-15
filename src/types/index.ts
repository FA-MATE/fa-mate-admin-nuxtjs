export type SubCategoryType = {
  id?: string
  categoryId: string
  name: string
  orderNo: string
}

export type CategoryType = {
  id?: string
  name: string
  orderNo: string
  subCategories: SubCategoryType[]
}

export type TagType = {
  id?: string
  tagGroupId: string
  name: string
  orderNo: string
}

export type TagGroupType = {
  id?: string
  name: string
  orderNo: string
  tags: TagType[]
}

export type ConditionType = {
  id?: string
  conditionGroupId: string
  name: string
  orderNo: string
}

export type ConditionGroupType = {
  id?: string
  name: string
  orderNo: string
  conditions: ConditionType[]
}

export type UserType = {
  id?: string
  nickname: string
  profileImageUrl: string
  conditions: ConditionType[]
  posts: PostType[]
}

export type PostImageType = {
  imageUrl: string
  orderNo: string
}

export type PostType = {
  id?: string
  title: string
  body: string
  categoryId: string
  subCategoryId: string
  user: UserType
  tags: TagType[]
  conditions: ConditionType[]
  postImages: PostImageType[]
  createdAt: string
  updatedAt: string
}
