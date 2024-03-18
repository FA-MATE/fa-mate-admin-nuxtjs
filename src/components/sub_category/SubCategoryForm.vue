<template>
  <div class="p-4">
    <div class="antialiased text-gray-900">
      <div class="max-w-xl mx-auto md:max-w-4xl border p-4">
        <p v-if="subCategory?.id == undefined" class="text-2xl">サブカテゴリ新規追加</p>
        <p v-else class="text-2xl">サブカテゴリ詳細</p>
        <div class="mt-2">
          <div class="grid grid-cols-1 gap-6">
            <InputTextField v-model="subCategory.id" label="ID" type="text" readonly />
            <CategoryFinderComponent v-model="category" />
            <InputTextField v-model="subCategory.name" label="サブカテゴリ名" type="text" />
            <InputTextField v-model="subCategory.orderNo" label="ソート順位" type="text" />
            <div v-if="subCategory?.id == undefined" class="flex justify-between">
              <div></div>
              <Button label="新規登録" color="green" @click="handlePostSubCategory" />
            </div>
            <div v-else class="flex justify-between">
              <Button label="削除" color="red" @click="handleDeleteSubCategory" />
              <Button label="修正" color="green" @click="handlePutSubCategory" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SubCategoryType } from '~/types'
import { useCategoriesStore } from '~/stores/category'
import InputTextField from '~/components/ui-part/form/InputTextField.vue'
import Button from '~/components/ui-part/form/Button.vue'
import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'

const { postSubCategory, putSubCategory, deleteSubCategory } = useCategoriesStore()

const categoriesStore = useCategoriesStore()
const subCategory = defineModel<SubCategoryType>({ required: true })
const category = ref(
  categoriesStore.categoriesStore.categories.filter((category) => category.id == subCategory.value.categoryId)
)
const CategoryFinderComponent = useSingleSelectableTextInput(categoriesStore.categoriesStore.categories, 'name')

async function handlePostSubCategory(): Promise<void> {
  if (!confirm('新規追加しますか？')) return

  await postSubCategory(subCategory.value).then(() => {
    navigateTo({
      path: '/categories/' + subCategory.value.categoryId,
    })
  })
}

async function handlePutSubCategory(): Promise<void> {
  if (!confirm('修正しますか？')) return

  await putSubCategory(subCategory.value).then(() => {
    navigateTo({
      path: '/categories/' + subCategory.value.categoryId,
    })
  })
}

async function handleDeleteSubCategory(): Promise<void> {
  if (!confirm('削除しますか？')) return

  await deleteSubCategory(subCategory.value).then(() => {
    navigateTo({
      path: '/categories/' + subCategory.value.categoryId,
    })
  })
}
</script>
