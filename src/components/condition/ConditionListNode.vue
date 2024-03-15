<template>
  <tr class="bg-white border-b">
    <td class="px-3 py-1 whitespace-nowrap text-sm font-medium text-blue-500">
      <NuxtLink :to="'/condition_groups/' + condition.conditionGroupId + '/conditions/' + condition.id">{{
        condition.id
      }}</NuxtLink>
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      {{ condition.name }}
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      {{ condition.orderNo }}
    </td>
    <td class="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap">
      <Button label="削除" color="red" @click="handleDeleteCondition" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { ConditionType } from '~/types'
import { useConditionsStore } from '~/stores/condition'
import Button from '~/components/ui-part/form/Button.vue'
import { useRouter } from 'vue-router'

const { deleteCondition } = useConditionsStore()
const { condition } = defineProps<{ condition: ConditionType }>()

const router = useRouter()

async function handleDeleteCondition(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deleteCondition(condition).then(() => {
    router.push({
      path: '/condition_groups/' + condition.conditionGroupId,
    })
  })
}
</script>
