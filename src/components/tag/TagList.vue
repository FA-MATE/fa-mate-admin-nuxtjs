<template>
  <table>
    <caption>
      <div class="flex justify-between">
        <div class="text-2xl">タグ一覧</div>
        <div>
          <NuxtLink :to="'/tag_groups/' + tagGroup.id + '/tags/new'">
            <Button label="新規追加" color="green" />
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
          タグ名
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
      <TagListNode v-for="tag in tagGroup.tags" :key="tag.id" :tag="tag" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { TagGroupType } from '~/types'
import Button from '~/components/ui-part/form/Button'

const { tagGroup } = defineProps<{ tagGroup: TagGroupType }>()
</script>
