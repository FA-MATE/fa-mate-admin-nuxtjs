<template>
  <div class="flex">
    <ConditionGroupList :conditionGroups="conditionGroupsStore.conditionGroupsStore.conditionGroups" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
  import type { ConditionGroupType } from '~/types'
  import { useConditionsStore } from '~/stores/condition';

  const conditionGroupsStore = useConditionsStore()
</script>
