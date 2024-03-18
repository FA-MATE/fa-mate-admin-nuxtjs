export type SubCategoryType = {
  id?: number
  categoryId: string
  name: string
  orderNo: number
}

export type CategoryType = {
  id?: number
  name: string
  orderNo: number
  subCategories: SubCategoryType[]
}

export type TagType = {
  id?: number
  tagGroupId: string
  name: string
  orderNo: number
}

export type TagGroupType = {
  id?: number
  name: string
  orderNo: number
  tags: TagType[]
}

export type ConditionType = {
  id?: number
  conditionGroupId: string
  name: string
  orderNo: number
}

export type ConditionGroupType = {
  id?: number
  name: string
  orderNo: number
  conditions: ConditionType[]
}

export type UserType = {
  id?: number
  nickname: string
  profileImageUrl: string
  conditions: ConditionType[]
  posts: PostType[]
}

export type PostImageType = {
  imageUrl: string
  orderNo: number
}

export type PostType = {
  id?: number
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
