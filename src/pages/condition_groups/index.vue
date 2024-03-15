<template>
  <div class="flex">
    <ConditionGroupList :condition-groups="conditionGroupsStore.conditionGroupsStore.conditionGroups" class="mx-auto" />
  </div>
</template>

<script setup lang="ts">
import { useConditionsStore } from '~/stores/condition'

const conditionGroupsStore = useConditionsStore()
</script>
