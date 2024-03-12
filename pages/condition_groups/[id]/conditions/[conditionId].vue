<script setup lang="ts">
import type { ConditionGroupType, ConditionType } from '~/types'
import { useConditionsStore } from '~/stores/condition';

const route = useRoute();
const id = route.params.conditionId;
const conditionGroupId = route.params.id

const { conditionGroupsStore: { conditionGroups } } = useConditionsStore()

const conditionGroup = conditionGroups.find((conditionGroup: ConditionGroupType) => conditionGroup.id == conditionGroupId)

const initCondition: ConditionType = {
  conditionGroupId,
  name: '',
  orderNo: 0,
}
const condition = computed(() => conditionGroup.conditions?.find((condition: ConditionType) => condition.id == id) || initCondition)
console.log(condition)
</script>

<template>
  <ConditionForm :condition="condition" />
</template>