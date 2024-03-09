<script lang="ts">
export default {
  props: ['category'],
};
</script>

<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{{ category.id }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ category.name }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ category.order_no }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <NuxtLink :to="'/categories/' + category.id">
        <button class="middle none center mr-4 rounded-lg bg-green-500 py-1 px-3 font-sans text-xs font-bold text-white">詳細</button>
      </NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <button class="middle none center mr-4 rounded-lg bg-red-500 py-1 px-3 font-sans text-xs font-bold text-white">削除</button>
    </td>
  </tr>
</template>
