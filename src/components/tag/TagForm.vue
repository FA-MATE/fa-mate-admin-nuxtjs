<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <p v-if="tag?.id == undefined" class="text-2xl">タグ新規追加</p>
        <p v-else class="text-2xl">タグ詳細</p>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="tag.id" label="ID" type="text" readonly />
            <InputTextField v-model="tag.tagGroupId" label="タググループID" type="text" />
            <InputTextField v-model="tag.name" label="タグ名" type="text" />
            <InputTextField v-model="tag.orderNo" label="ソート順位" type="text" />
            <div v-if="tag?.id == undefined" class="flex justify-between">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostTag" />
            </div>
            <div v-else class="flex justify-between">
              <Button label="削除" color="red" @click="handleDeleteTag" />
              <Button label="修正" color="green" @click="handlePutTag" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TagType } from '~/types'
import { useTagsStore } from '~/stores/tag'
import InputTextField from '~/components/ui-part/form/InputTextField.vue'
import Button from '~/components/ui-part/form/Button.vue'

const { postTag, putTag, deleteTag } = useTagsStore()

const tag = defineModel<TagType>({ required: true })

async function handlePostTag(): Promise<void> {
  if (!confirm('新規追加しますか？')) return

  await postTag(tag.value).then(() =>
    navigateTo({
      path: '/tag_groups/' + tag.value.tagGroupId,
    })
  )
}

async function handlePutTag(): Promise<void> {
  if (!confirm('修正しますか？')) return

  await putTag(tag.value).then(() =>
    navigateTo({
      path: '/tag_groups/' + tag.value.tagGroupId,
    })
  )
}

async function handleDeleteTag(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deleteTag(tag.value).then(() =>
    navigateTo({
      path: '/tag_groups/' + tag.value.tagGroupId,
    })
  )
}
</script>
