<template>
  <table>
    <caption>
      <div class="flex justify-between">
        <div class="text-2xl">サブカテゴリ一覧</div>
        <div>
          <NuxtLink :to="'/categories/' + category.id + '/sub_categories/new'">
            <Button label="新規追加" color="green" />
          </NuxtLink>
        </div>
      </div>
    </caption>
    <thead class="bg-white border-b">
      <tr>
        <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">ID</th>
        <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">サブカテゴリ名</th>
        <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">ソート順位</th>
        <td class="border border-slate-300 dark:border-slate-700 px-4 py-1 text-slate-500 dark:text-slate-400 text-cyan-600" colspan="2"></td>
      </tr>
    </thead>
    <tbody>
      <SubCategoryListNode v-for="subCategory in category.subCategories" :subCategory="subCategory" :key="subCategory.id" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import type { CategoryType } from "~/types";;
  import Button from '~/components/ui-part/form/Button'

  const { category } = defineProps<{category: CategoryType}>()
</script>