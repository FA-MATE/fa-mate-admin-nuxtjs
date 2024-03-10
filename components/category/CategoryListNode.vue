<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/categories/' + category.id">{{ category.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ category.name }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ category.orderNo }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <NuxtLink :to="'/posts?categoryId=' + category.id ">
        <button class="center rounded-lg py-1 px-3 mr-1 font-sans text-xs font-bold border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">関連投稿</button>
      </NuxtLink>
      <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-red-500 text-red-500 hover:bg-red-500  hover:text-white" @click="handleDeleteCategory">
        削除
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { CategoryType } from '~/types'
  import { useCategoriesStore } from '~/stores/category';

  const { category } = defineProps<{category: CategoryType}>();
  const { deleteCategory } = useCategoriesStore()

  async function handleDeleteCategory() {
    if(!confirm('削除しますか？')) return

    await deleteCategory(category)

    navigateTo({ path: '/categories' });
  }
</script>