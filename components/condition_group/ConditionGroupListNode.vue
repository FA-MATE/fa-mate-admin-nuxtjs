<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/condition_groups/' + conditionGroup.id">{{ conditionGroup.id }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ conditionGroup.name }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">{{ conditionGroup.orderNo }}</td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <NuxtLink :to="'/posts?conditionGroupId=' + conditionGroup.id ">
        <Button label="関連投稿" color="orange" />
      </NuxtLink>
      <Button label="削除" color="red" :onClick="handleDeleteConditionGroup" />
    </td>
  </tr>
</template>

<script setup lang="ts">
  import type { ConditionGroupType } from '~/types'
  import { useConditionsStore } from '~/stores/condition';
  import Button from '~/components/ui-part/form/Button'

  const { conditionGroup } = defineProps<{conditionGroup: ConditionGroupType}>();
  const { deleteConditionGroup } = useConditionsStore()

  async function handleDeleteConditionGroup() {
    if(!confirm('削除しますか？')) return

    await deleteConditionGroup(conditionGroup)

    navigateTo({ path: '/condition_groups' });
  }
</script>