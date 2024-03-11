<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/posts/' + post.id">{{ post.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ post.title }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ post.categoryId }} > {{ post.subCategoryId }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ post.user.nickname }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-red-500 text-red-500 hover:bg-red-500  hover:text-white">
        削除
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { PostType } from '~/types'

  defineProps<{post: PostType}>();
</script>
