<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div class="text-2xl" v-if="conditionGroup.id === undefined">お譲り条件グループ新規追加</div>
        <div class="text-2xl" v-else>お譲り条件グループ詳細</div>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="conditionGroup.id" label="ID" type="text" readonly />
            <InputTextField v-model="conditionGroup.name" label="お譲り条件グループ名" type="text" />
            <InputTextField v-model="conditionGroup.orderNo" label="ソート順位" type="number" />
            <div class="flex justify-between" v-if="conditionGroup.id === undefined">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostConditionGroup" />
            </div>
            <div class="flex justify-between" v-else>
              <Button label="削除" color="red" @click="handleDeleteConditionGroup" />
              <Button label="修正" color="green" @click="handlePutConditionGroup" />
            </div>
          </div>
        </div>

        <ConditionList :conditions="conditionGroup.conditions" v-if="conditionGroup.id != undefined" class="mt-6">
          <div>
            <NuxtLink :to="'/condition_groups/' + conditionGroup.id + '/conditions/new'">
              <Button label="新規追加" color="green" />
            </NuxtLink>
          </div>
        </ConditionList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ConditionGroupType } from '~/types'
  import { useConditionsStore } from '~/stores/condition';
  import InputTextField from '~/components/ui-part/form/InputTextField'
  import Button from '~/components/ui-part/form/Button'

  const { conditionGroup } = defineProps<{conditionGroup: ConditionGroupType}>();
  const { postConditionGroup, putConditionGroup, deleteConditionGroup } = useConditionsStore()

  async function handlePostConditionGroup() {
    if(!confirm('新規追加しますか？')) return

    const newConditionGroup = await postConditionGroup(conditionGroup)

    navigateTo({ path: '/condition_groups/' + newConditionGroup.id });
  }

  async function handlePutConditionGroup() {
    if(!confirm('修正しますか？')) return

    await putConditionGroup(conditionGroup)
  }

  async function handleDeleteConditionGroup() {
    if(!confirm('削除しますか？')) return

    await deleteConditionGroup(conditionGroup)

    navigateTo({ path: '/condition_groups' });
  }
</script>