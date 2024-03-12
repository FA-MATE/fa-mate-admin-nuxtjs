import { ref } from 'vue'
import { defineStore } from "pinia";
import type { ConditionGroupType, ConditionType } from "~/types";

export const useConditionsStore = defineStore('conditions', () => {
  const conditionGroupsStore = reactive({ conditionGroups: [] as ConditionGroupType[] })

  async function getConditionGroups() {
    const newConditionGroups = (await $fetch('/api/condition_groups')) as ConditionGroupType[];

    conditionGroupsStore.conditionGroups = newConditionGroups;
  }

  async function postConditionGroup(conditionGroup: ConditionGroupType) {
    const newConditionGroup = await $fetch('/api/condition_groups',
      { 
        method: 'POST',
        body: { conditionGroup },
      }
    ) as ConditionGroupType;

    await getConditionGroups()
    return newConditionGroup
  }

  async function putConditionGroup(conditionGroup: ConditionGroupType) {
    const newConditionGroup = await $fetch('/api/condition_groups/' + conditionGroup.id,
      { 
        method: 'PUT',
        body: { conditionGroup },
      }
    ) as ConditionGroupType;

    await getConditionGroups()
    return newConditionGroup
  }

  async function deleteConditionGroup(conditionGroup: ConditionGroupType) {
    const conditionGroupId = conditionGroup.id
    await $fetch('/api/condition_groups/' + conditionGroup.id,
      { 
        method: 'DELETE',
      }
    ) as ConditionGroupType;

    await getConditionGroups()
  }

  async function postCondition(condition: ConditionType) {
    await $fetch('/api/conditions',
      { 
        method: 'POST',
        body: { condition: condition },
      }
    )

    await getConditionGroups()
  }

  async function putCondition(condition: ConditionType) {
    await $fetch('/api/conditions/' + condition.id,
      { 
        method: 'PUT',
        body: { condition },
      }
    )

    await getConditionGroups()
  }

  async function deleteCondition(condition: ConditionType) {
    await $fetch('/api/conditions/' + condition.id,
      { 
        method: 'DELETE',
      }
    )

    await getConditionGroups()
  }

  return { conditionGroupsStore, getConditionGroups, postConditionGroup, putConditionGroup, deleteConditionGroup, postCondition, putCondition, deleteCondition }
});
