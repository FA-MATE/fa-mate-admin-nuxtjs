import { defineStore } from 'pinia'
import type { CategoryType, SubCategoryType } from '~/types'

const API_ENDPOINT = '/api/categories'

export const useCategoriesStore = defineStore('categories', () => {
  const categoriesStore = reactive({ categories: [] as CategoryType[] })

  async function getCategories(queryString: string = ''): Promise<void> {
    const newCategories = (await $fetch(`${API_ENDPOINT}?${queryString}`)) as CategoryType[]

    categoriesStore.categories = newCategories
  }

  async function postCategory(category: CategoryType): Promise<CategoryType> {
    const newCategory = (await $fetch(API_ENDPOINT, {
      method: 'POST',
      body: { category },
    })) as CategoryType

    categoriesStore.categories = [...categoriesStore.categories, newCategory]

    return newCategory
  }

  async function putCategory(category: CategoryType): Promise<CategoryType> {
    const newCategory = (await $fetch(`${API_ENDPOINT}/${category.id}`, {
      method: 'PUT',
      body: { category },
    })) as CategoryType

    categoriesStore.categories = categoriesStore.categories.map((category) =>
      category.id != newCategory.id ? newCategory : category
    )

    return newCategory
  }

  async function deleteCategory(targetCategory: CategoryType): Promise<void> {
    await $fetch(`${API_ENDPOINT}/${targetCategory.id}`, {
      method: 'DELETE',
    })

    categoriesStore.categories = categoriesStore.categories.filter((category) => category.id != targetCategory.id)
  }

  async function postSubCategory(subCategory: SubCategoryType): Promise<void> {
    await $fetch(`${API_ENDPOINT}/${subCategory.categoryId}/sub_categories`, {
      method: 'POST',
      body: { subCategory },
    })

    await getCategories()
  }

  async function putSubCategory(subCategory: SubCategoryType): Promise<void> {
    await $fetch(`${API_ENDPOINT}/${subCategory.categoryId}/sub_categories/${subCategory.id}`, {
      method: 'PUT',
      body: { subCategory },
    })

    await getCategories()
  }

  async function deleteSubCategory(subCategory: SubCategoryType): Promise<void> {
    await $fetch(`${API_ENDPOINT}/${subCategory.categoryId}/sub_categories/${subCategory.id}`, {
      method: 'DELETE',
    })

    await getCategories()
  }

  return {
    categoriesStore,
    getCategories,
    postCategory,
    putCategory,
    deleteCategory,
    postSubCategory,
    putSubCategory,
    deleteSubCategory,
  }
})
