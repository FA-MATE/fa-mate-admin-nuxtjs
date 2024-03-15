<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div v-if="tagGroup?.id == undefined" class="text-2xl">タググループ新規追加</div>
        <div v-else class="text-2xl">タググループ詳細</div>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="tagGroup.id" label="ID" type="text" readonly />
            <InputTextField v-model="tagGroup.name" label="タググループ名" type="text" />
            <InputTextField v-model="tagGroup.orderNo" label="ソート順位" type="text" />
            <div v-if="tagGroup?.id == undefined" class="flex justify-between">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostTagGroup" />
            </div>
            <div v-else class="flex justify-between">
              <Button label="削除" color="red" @click="handleDeleteTagGroup" />
              <Button label="修正" color="green" @click="handlePutTagGroup" />
            </div>
          </div>
        </div>

        <TagList v-if="tagGroup.id != undefined" :tag-group="tagGroup" class="mt-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TagGroupType } from '~/types'
import { useTagsStore } from '~/stores/tag'
import InputTextField from '~/components/ui-part/form/InputTextField.vue'
import Button from '~/components/ui-part/form/Button.vue'

const tagGroup = defineModel<TagGroupType>({ required: true })
const { postTagGroup, putTagGroup, deleteTagGroup } = useTagsStore()

async function handlePostTagGroup(): Promise<void> {
  if (!confirm('新規追加しますか？')) return

  await postTagGroup(tagGroup.value).then((newTagGroup) => navigateTo({ path: '/tag_groups/' + newTagGroup.id }))
}

async function handlePutTagGroup(): Promise<void> {
  if (!confirm('修正しますか？')) return

  await putTagGroup(tagGroup.value)
}

async function handleDeleteTagGroup(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deleteTagGroup(tagGroup.value).then(() => navigateTo({ path: '/tag_groups' }))
}
</script>
