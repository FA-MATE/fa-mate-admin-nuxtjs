import { defineStore } from 'pinia'
import type { CategoryType, SubCategoryType } from '~/types'

const API_ENDPOINT = '/api/categories'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<CategoryType[]>([])
  const subCategories = computed(() => categories.value.flatMap((category) => category.subCategories))

  async function getCategories(queryString: string = ''): Promise<void> {
    const newCategories = (await $fetch(`${API_ENDPOINT}?${queryString}`)) as CategoryType[]

    categories.value = newCategories
    categories.value = newCategories.map((category) => decorateNameForSubCategory(category))
  }

  async function postCategory(category: CategoryType): Promise<CategoryType> {
    const newCategory = (await $fetch(API_ENDPOINT, {
      method: 'POST',
      body: { category },
    })) as CategoryType

    categories.value = [...categories.value, decorateNameForSubCategory(newCategory)]

    return newCategory
  }

  async function putCategory(category: CategoryType): Promise<CategoryType> {
    const newCategory = (await $fetch(`${API_ENDPOINT}/${category.id}`, {
      method: 'PUT',
      body: { category },
    })) as CategoryType

    categories.value = categories.value.map((category) => (category.id != newCategory.id ? newCategory : category))

    return newCategory
  }

  async function deleteCategory(targetCategory: CategoryType): Promise<void> {
    await $fetch(`${API_ENDPOINT}/${targetCategory.id}`, {
      method: 'DELETE',
    })

    categories.value = categories.value.filter((category) => category.id != targetCategory.id)
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

  function decorateNameForSubCategory(category: CategoryType): CategoryType {
    category.subCategories = category.subCategories.map((subCategory) => {
      subCategory.name = `${category.name}: ${subCategory.name}`
      return subCategory
    })
    return category
  }

  return {
    categories,
    subCategories,
    getCategories,
    postCategory,
    putCategory,
    deleteCategory,
    postSubCategory,
    putSubCategory,
    deleteSubCategory,
  }
})
