<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <div v-if="category?.id == undefined" class="text-2xl">カテゴリ新規追加</div>
        <div v-else class="text-2xl">カテゴリ詳細</div>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="category.id" label="ID" type="text" readonly />
            <InputTextField v-model="category.name" label="カテゴリ名" type="text" />
            <InputTextField v-model="category.orderNo" label="ソート順位" type="number" />
            <div v-if="category?.id == undefined" class="flex justify-between">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostCategory" />
            </div>
            <div v-else class="flex justify-between">
              <Button label="削除" color="red" @click="handleDeleteCategory" />
              <Button label="修正" color="green" @click="handlePutCategory" />
            </div>
          </div>
        </div>

        <SubCategoryList v-if="category.id != undefined" :category="category" class="mt-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CategoryType } from '~/types'
import { useCategoriesStore } from '~/stores/category'
import InputTextField from '~/components/ui-part/form/InputTextField.vue'
import Button from '~/components/ui-part/form/Button.vue'
import { useRouter } from 'vue-router'

const category = defineModel<CategoryType>({ required: true })

const { postCategory, putCategory, deleteCategory } = useCategoriesStore()

const router = useRouter()

async function handlePostCategory(): Promise<void> {
  if (!confirm('新規追加しますか？')) return

  await postCategory(category.value).then((newCategory) => {
    router.push({ path: '/categories/' + newCategory.id })
  })
}

async function handlePutCategory(): Promise<void> {
  if (!confirm('修正しますか？')) return

  await putCategory(category.value)
}

async function handleDeleteCategory(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deleteCategory(category.value).then(() => {
    router.push({ path: '/categories' })
  })
}
</script>
