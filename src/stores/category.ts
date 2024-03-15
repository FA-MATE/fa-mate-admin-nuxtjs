import { defineStore } from 'pinia'
import type { CategoryType, SubCategoryType } from '~/types'

export const useCategoriesStore = defineStore('categories', () => {
  const categoriesStore = reactive({ categories: [] as CategoryType[] })

  async function getCategories(queryString: string = ''): Promise<void> {
    const newCategories = (await $fetch('/api/categories?' + queryString)) as CategoryType[]

    categoriesStore.categories = newCategories
  }

  async function postCategory(category: CategoryType): Promise<CategoryType> {
    const newCategory = (await $fetch('/api/categories', {
      method: 'POST',
      body: { category },
    })) as CategoryType

    await getCategories()
    return newCategory
  }

  async function putCategory(category: CategoryType): Promise<CategoryType> {
    const newCategory = (await $fetch('/api/categories/' + category.id, {
      method: 'PUT',
      body: { category },
    })) as CategoryType

    await getCategories()
    return newCategory
  }

  async function deleteCategory(category: CategoryType): Promise<void> {
    ;(await $fetch('/api/categories/' + category.id, {
      method: 'DELETE',
    })) as CategoryType

    await getCategories()
  }

  async function postSubCategory(subCategory: SubCategoryType): Promise<void> {
    await $fetch('/api/categories/' + subCategory.categoryId + '/sub_categories', {
      method: 'POST',
      body: { subCategory },
    })

    await getCategories()
  }

  async function putSubCategory(subCategory: SubCategoryType): Promise<void> {
    await $fetch('/api/categories/' + subCategory.categoryId + '/sub_categories/' + subCategory.id, {
      method: 'PUT',
      body: { subCategory },
    })

    await getCategories()
  }

  async function deleteSubCategory(subCategory: SubCategoryType): Promise<void> {
    await $fetch('/api/categories/' + subCategory.categoryId + '/sub_categories/' + subCategory.id, {
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
