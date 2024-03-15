import { defineStore } from 'pinia'
import type { TagGroupType, TagType } from '~/types'

export const useTagsStore = defineStore('tags', () => {
  const tagGroupsStore = reactive({ tagGroups: [] as TagGroupType[] })

  async function getTagGroups(): Promise<void> {
    const newTagGroups = (await $fetch('/api/tag_groups')) as TagGroupType[]

    tagGroupsStore.tagGroups = newTagGroups
  }

  async function postTagGroup(tagGroup: TagGroupType): Promise<TagGroupType> {
    const newTagGroup = (await $fetch('/api/tag_groups', {
      method: 'POST',
      body: { tagGroup },
    })) as TagGroupType

    await getTagGroups()
    return newTagGroup
  }

  async function putTagGroup(tagGroup: TagGroupType): Promise<TagGroupType> {
    const newTagGroup = (await $fetch('/api/tag_groups/' + tagGroup.id, {
      method: 'PUT',
      body: { tagGroup },
    })) as TagGroupType

    await getTagGroups()
    return newTagGroup
  }

  async function deleteTagGroup(tagGroup: TagGroupType): Promise<void> {
    ;(await $fetch('/api/tag_groups/' + tagGroup.id, {
      method: 'DELETE',
    })) as TagGroupType

    await getTagGroups()
  }

  async function postTag(tag: TagType): Promise<void> {
    await $fetch('/api/tags', {
      method: 'POST',
      body: { tag },
    })

    await getTagGroups()
  }

  async function putTag(tag: TagType): Promise<void> {
    await $fetch('/api/tags/' + tag.id, {
      method: 'PUT',
      body: { tag },
    })

    await getTagGroups()
  }

  async function deleteTag(tag: TagType): Promise<void> {
    await $fetch('/api/tags/' + tag.id, {
      method: 'DELETE',
    })

    await getTagGroups()
  }

  return {
    tagGroupsStore,
    getTagGroups,
    postTagGroup,
    putTagGroup,
    deleteTagGroup,
    postTag,
    putTag,
    deleteTag,
  }
})
