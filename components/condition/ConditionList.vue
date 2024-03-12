<template>
  <table>
    <caption>
      <div class="flex justify-between">
        <div class="text-2xl">お譲り条件一覧</div>
        <div>
          <NuxtLink :to="'/condition_groups/' + conditionGroup.id + '/conditions/new'">
            <Button label="新規追加" color="green" />
          </NuxtLink>
        </div>
      </div>
    </caption>
    <thead class="bg-white border-b">
      <tr>
        <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">ID</th>
        <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">お譲り条件名</th>
        <th class="border border-slate-300 dark:border-slate-600 font-semibold px-4 py-1 text-slate-900 dark:text-slate-200 text-left">ソート順位</th>
        <td class="border border-slate-300 dark:border-slate-700 px-4 py-1 text-slate-500 dark:text-slate-400 text-cyan-600" colspan="2"></td>
      </tr>
    </thead>
    <tbody>
      <ConditionListNode v-for="condition in conditionGroup.conditions" :condition="condition" :key="condition.id" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import type { ConditionGroupType } from "~/types";;
  import Button from '~/components/ui-part/form/Button'

  const { conditionGroup } = defineProps<{conditionGroup: ConditionGroupType}>()
</script>