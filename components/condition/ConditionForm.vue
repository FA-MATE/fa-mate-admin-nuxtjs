<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <p class="text-2xl" v-if="condition.id === undefined">お譲り条件新規追加</p>
        <p class="text-2xl" v-else>お譲り条件詳細</p>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="condition.id" label="ID" type="text" readonly />
            <InputTextField v-model="condition.conditionGroupId" label="お譲り条件グループID" type="text" />
            <InputTextField v-model="condition.name" label="お譲り条件名" type="text" />
            <InputTextField v-model="condition.orderNo" label="ソート順位" type="text" />
            <div class="flex justify-between" v-if="condition.id === undefined">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostCondition" />
            </div>
            <div class="flex justify-between" v-else>
              <Button label="削除" color="red" @click="handleDeleteCondition" />
              <Button label="修正" color="green" @click="handlePutCondition" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ConditionType } from '~/types'
  import { useConditionsStore } from '~/stores/condition';
  import InputTextField from '~/components/ui-part/form/InputTextField'
  import Button from '~/components/ui-part/form/Button'

  const { getConditions, postCondition, putCondition, deleteCondition } = useConditionsStore()

  const { condition } = defineProps<{condition: ConditionType}>();

  async function handlePostCondition() {
    if(!confirm('新規追加しますか？')) return

    await postCondition(condition)

    navigateTo({
      path: '/condition_groups/' + condition.conditionGroupId
    });
  }

  async function handlePutCondition() {
    if(!confirm('修正しますか？')) return
    
    await putCondition(condition)

    navigateTo({
      path: '/condition_groups/' + condition.conditionGroupId
    });
  }

  async function handleDeleteCondition() {
    if(!confirm('削除しますか？')) return

    await deleteCondition(condition)

    navigateTo({
      path: '/condition_groups/' + condition.conditionGroupId
    });
  }
</script>