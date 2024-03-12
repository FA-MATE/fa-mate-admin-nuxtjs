<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/categories/' + subCategory.categoryId + '/sub_categories/' + subCategory.id">{{ subCategory.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ subCategory.name }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ subCategory.orderNo }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <Button label="削除" color="red" :onClick="handleDeleteSubCategory" />
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { SubCategoryType } from '~/types'
  import { useCategoriesStore } from '~/stores/category';
  import Button from '~/components/ui-part/form/Button'

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

