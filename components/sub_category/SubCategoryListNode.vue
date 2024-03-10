<script setup lang="ts">
import type { SubCategoryType } from '~/types'

import { useCategoriesStore } from '~/stores/category';

const { deleteSubCategory } = useCategoriesStore()

const { subCategory } = defineProps<{subCategory: SubCategoryType}>();

async function handleDeleteSubCategory() {
  if(!confirm('削除しますか？')) return

  await deleteSubCategory(subCategory)

  navigateTo({
    path: '/categories/' + subCategory.categoryId
  });
}
</script>

<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/categories/' + subCategory.categoryId + '/sub_categories/' + subCategory.id">{{ subCategory.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ subCategory.name }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ subCategory.orderNo }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-red-500 text-red-500 hover:bg-red-500  hover:text-white" @click="handleDeleteSubCategory">
        削除
      </button>
    </td>
  </tr>
</template>
~/types