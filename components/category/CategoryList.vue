<template>
  <div class="p-4">
    <table>
      <caption>
        <div class="flex justify-between">
          <div class="text-2xl">カテゴリ一覧</div>
          <div>
            <NuxtLink to="/categories/new">
              <button class="center rounded-lg py-1 px-3 font-sans text-xs font-bold border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">新規追加</button>
            </NuxtLink>
          </div>
        </div>
      </caption>
      <thead class="bg-white border-b">
        <tr>
          <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">ID</th>
          <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">カテゴリ名</th>
          <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">ソート順位</th>
          <td class="border border-slate-300 dark:border-slate-700 px-4 py-1 text-slate-500 dark:text-slate-400 text-cyan-600" colspan="2"></td>
        </tr>
      </thead>
      <tbody>
        <CategoryListNode v-for="category in categories" :category="category" :key="category.id" />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import type { CategoryType } from "~/types";

  const { categories } = defineProps<{categories: CategoryType[]}>()
</script>