import { defineStore } from 'pinia'
import type { ConditionGroupType, ConditionType } from '~/types'

export const useConditionsStore = defineStore('conditions', () => {
  const conditionGroupsStore = reactive({
    conditionGroups: [] as ConditionGroupType[],
  })

  async function getConditionGroups(): Promise<void> {
    const newConditionGroups = (await $fetch('/api/condition_groups')) as ConditionGroupType[]

    conditionGroupsStore.conditionGroups = newConditionGroups
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

  return {
    conditionGroupsStore,
    getConditionGroups,
    postConditionGroup,
    putConditionGroup,
    deleteConditionGroup,
    postCondition,
    putCondition,
    deleteCondition,
  }
})
