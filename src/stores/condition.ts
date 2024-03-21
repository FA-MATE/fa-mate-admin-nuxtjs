import { defineStore } from 'pinia'
import type { ConditionGroupType, ConditionType } from '~/types'

export const useConditionsStore = defineStore('conditions', () => {
  const conditionGroups = ref<ConditionGroupType[]>([])
  const conditions = computed(() => conditionGroups.value.flatMap((conditionGroup) => conditionGroup.conditions))

  async function getConditionGroups(): Promise<void> {
    const newConditionGroups = (await $fetch('/api/condition_groups')) as ConditionGroupType[]

    conditionGroups.value = newConditionGroups.map((conditionGroup) => decorateNameForCondition(conditionGroup))
  }

  async function postConditionGroup(conditionGroup: ConditionGroupType): Promise<ConditionGroupType> {
    const newConditionGroup = (await $fetch('/api/condition_groups', {
      method: 'POST',
      body: { conditionGroup },
    })) as ConditionGroupType

    await getConditionGroups()
    return newConditionGroup
  }

  async function putConditionGroup(conditionGroup: ConditionGroupType): Promise<ConditionGroupType> {
    const newConditionGroup = (await $fetch('/api/condition_groups/' + conditionGroup.id, {
      method: 'PUT',
      body: { conditionGroup },
    })) as ConditionGroupType

    await getConditionGroups()
    return newConditionGroup
  }

  async function deleteConditionGroup(conditionGroup: ConditionGroupType): Promise<void> {
    ;(await $fetch('/api/condition_groups/' + conditionGroup.id, {
      method: 'DELETE',
    })) as ConditionGroupType

    await getConditionGroups()
  }

  async function postCondition(condition: ConditionType): Promise<void> {
    await $fetch('/api/conditions', {
      method: 'POST',
      body: { condition },
    })

    await getConditionGroups()
  }

  async function putCondition(condition: ConditionType): Promise<void> {
    await $fetch('/api/conditions/' + condition.id, {
      method: 'PUT',
      body: { condition },
    })

    await getConditionGroups()
  }

  async function deleteCondition(condition: ConditionType): Promise<void> {
    await $fetch('/api/conditions/' + condition.id, {
      method: 'DELETE',
    })

    await getConditionGroups()
  }

  function decorateNameForCondition(conditionGroup: ConditionGroupType): ConditionGroupType {
    conditionGroup.conditions = conditionGroup.conditions.map((condition) => {
      condition.name = `${conditionGroup.name}: ${condition.name}`
      return condition
    })
    return conditionGroup
  }

  return {
    conditionGroups,
    conditions,
    getConditionGroups,
    postConditionGroup,
    putConditionGroup,
    deleteConditionGroup,
    postCondition,
    putCondition,
    deleteCondition,
  }
})
