<template>
  <table>
    <caption>
      <div class="flex justify-between">
        <div class="text-2xl">タググループ一覧</div>
        <div>
          <NuxtLink to="/tag_groups/new">
            <Button label="新規登録" color="green" />
          </NuxtLink>
        </div>
      </div>
    </caption>
    <thead class="bg-white border-b">
      <tr>
        <th
          class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left"
        >
          ID
        </th>
        <th
          class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left"
        >
          タググループ名
        </th>
        <th
          class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left"
        >
          ソート順位
        </th>
        <td
          class="border border-slate-300 dark:border-slate-700 px-4 py-1 text-slate-500 dark:text-slate-400 text-cyan-600"
          colspan="2"
        ></td>
      </tr>
    </thead>
    <tbody>
      <TagGroupListNode v-for="tagGroup in tagGroups" :key="tagGroup.id" :tag-group="tagGroup" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { TagGroupType } from '~/types'
import Button from '~/components/ui-part/form/Button'

defineProps<{ tagGroups: TagGroupType[] }>()
</script>
