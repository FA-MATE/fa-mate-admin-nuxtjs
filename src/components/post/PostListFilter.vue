<template>
  <div class="my-2 py-2">
    <CategoryFinderComponent v-model="selectedCategoryId" class="z-50" label="カテゴリ" />
    <SubCategoryFinderComponent v-model="selectedSubCategoryId" class="z-40" label="サブカテゴリ" />
    <TagFinderComponent v-model="selectedTagIds" class="z-30" label="タグ" />
    <ConditionFinderComponent v-model="selectedConditionIds" class="z-20" label="お譲り条件" />
    <UserFinderComponent v-model="selectedUserId" class="z-10" label="作成者" />
    <div class="flex justify-end pt-2">
      <Button color="green" label="検索" @click="filterPosts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSelectableTextInput } from '~/composable/useSelectableTextInput'
import { useCategoriesStore } from '~/stores/category'
import Button from '~/components/ui-part/form/Button.vue'
import { useRouter } from 'vue-router'
import { useTagsStore } from '~/stores/tag'
import { useConditionsStore } from '~/stores/condition'
import { useUsersStore } from '~/stores/user'
import { createQueryStrings } from '~/utils'

const props = defineProps<{
  categoryId?: number | string | string[]
  subCategoryId?: number | string | string[]
  tagId?: number | string | string[]
  conditionId?: number | string | string[]
  userId?: number | string | string[]
}>()

// カテゴリ
const { categories, subCategories } = useCategoriesStore()
const selectedCategoryId = ref(props.categoryId)
const CategoryFinderComponent = useSelectableTextInput(categories, 'name')

// サブカテゴリ
const selectedSubCategoryId = ref(props.subCategoryId)
const SubCategoryFinderComponent = useSelectableTextInput(subCategories, 'name')

// タグ
const { tags } = useTagsStore()
const selectedTagIds = ref(props.tagId)
const TagFinderComponent = useSelectableTextInput(tags, 'name', { uniqueColumn: 'tagGroupId' })

// お譲り条件
const { conditions } = useConditionsStore()
const selectedConditionIds = ref(props.conditionId)
const ConditionFinderComponent = useSelectableTextInput(conditions, 'name', { uniqueColumn: 'conditionGroupId' })

// ユーザ
const { users } = useUsersStore()
const selectedUserId = ref(props.userId)
const UserFinderComponent = useSelectableTextInput(users, 'nickname')

const router = useRouter()

async function filterPosts(): Promise<void> {
  const queryStrings = createQueryStrings({
    categoryId: selectedCategoryId.value,
    subCategoryId: selectedSubCategoryId.value,
    tagId: selectedTagIds.value,
    conditionId: selectedConditionIds.value,
    userId: selectedUserId.value,
  })

  router
    .push({
      path: '/posts',
      query: queryStrings,
    })
    .then(() => router.go(0))
}
</script>
