import { ref } from 'vue'
import { defineStore } from "pinia";
import type { CategoryType, SubCategoryType } from "~/types";

export const useCategoriesStore = defineStore('categories', () => {
  const categoriesStore = reactive({ categories: [] as CategoryType[] })

  async function getCategories() {
    const newCategories = (await $fetch('/api/categories')) as CategoryType[];

    categoriesStore.categories = newCategories;
  }

  async function postCategory(category: CategoryType) {
    const newCategory = await $fetch('/api/categories',
      { 
        method: 'POST',
        body: { category },
      }
    ) as CategoryType;

    categoriesStore.categories = [...categoriesStore.categories, newCategory];

    return newCategory
  }

  async function putCategory(category: CategoryType) {
    const newCategories = await $fetch('/api/categories/' + category.id,
      { 
        method: 'PUT',
        body: { category },
      }
    ) as CategoryType;

    categoriesStore.categories = [...categoriesStore.categories.filter((category: CategoryType) => category.id != newCategories.id), newCategories];
  }

  async function deleteCategory(category: CategoryType) {
    const categoryId = category.id
    const newCategories = await $fetch('/api/categories/' + category.id,
      { 
        method: 'DELETE',
      }
    ) as CategoryType;

    categoriesStore.categories = categoriesStore.categories.filter((category: CategoryType) => category.id !== categoryId);
  }

  async function postSubCategory(subCategory: SubCategoryType) {
    const newSubCategories = await $fetch('/api/categories/' + subCategory.categoryId + '/sub_categories',
      { 
        method: 'POST',
        body: { subCategory: subCategory },
      }
    ) as SubCategoryType;

    const category = categoriesStore.categories.find((category: CategoryType) => category.id == subCategory.categoryId)
    if (category !== null && category !== undefined ) {
      const subCategories = category.subCategories || []
      categoriesStore.categories = [
        ...categoriesStore.categories.filter((category: CategoryType) => category.id != subCategory.categoryId),
        {...category,
        subCategories: [...subCategories, newSubCategories]
        }
      ];
    }
  }

  async function putSubCategory(subCategory: SubCategoryType) {
    const newSubCategories = await $fetch('/api/categories/' + subCategory.categoryId + '/sub_categories/' + subCategory.id,
      { 
        method: 'PUT',
        body: { subCategory },
      }
    ) as SubCategoryType;

    const category = categoriesStore.categories.find((category: CategoryType) => category.id == subCategory.categoryId)
    if (category !== null && category !== undefined ) {
      categoriesStore.categories = [
        ...categoriesStore.categories.filter((category: CategoryType) => category.id != subCategory.categoryId),
        {...category,
        subCategories: [...category.subCategories.filter((subCategory) => subCategory.id != subCategory.id), newSubCategories]
        }
      ];
    }
  }

  async function deleteSubCategory(subCategory: SubCategoryType) {
    await $fetch('/api/categories/' + subCategory.categoryId + '/sub_categories/' + subCategory.id,
      { 
        method: 'DELETE',
      }
    )

    const targetCategory = categoriesStore.categories.find((category: CategoryType) => category.id == subCategory.categoryId)
    categoriesStore.categories = categoriesStore.categories.map((c: CategoryType) => {
      if(c.id != targetCategory.id){
        return c;
      }else {
        return {
          ...c,
          subCategories: targetCategory.subCategories.filter((sc) => sc.id != subCategory.id)
        }
      }
      });
  }

  return { categoriesStore, getCategories, postCategory, putCategory, deleteCategory, postSubCategory, putSubCategory, deleteSubCategory }
});
