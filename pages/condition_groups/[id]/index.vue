<template>
  <div>
    <ConditionGroupForm :conditionGroup="conditionGroup" />
  </div>
</template>

<script setup lang="ts">
  import type { ConditionGroupType } from '~/types'
  import { useConditionsStore } from '~/stores/condition';

  const route = useRoute();
  const id = route.params.id;

  const { conditionGroupsStore } = useConditionsStore()
  const initConditionGroup: ConditionGroupType = {
    name: '',
    orderNo: 0,
  }
  const conditionGroup = computed(() => 
    conditionGroupsStore.conditionGroups.find((conditionGroup: ConditionGroupType) => conditionGroup.id == id) || initConditionGroup
  )
</script>