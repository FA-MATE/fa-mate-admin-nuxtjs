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
import { useSingleSelectableTextInput } from '~/composable/useSingleSelectableTextInput'
import { useCategoriesStore } from '~/stores/category'
import Button from '~/components/ui-part/form/Button.vue'
import { useRouter } from 'vue-router'
import { useTagsStore } from '~/stores/tag'
import { useConditionsStore } from '~/stores/condition'
import { useUsersStore } from '~/stores/user'
import { createQueryStrings } from '~/utils'
import { useMultiSelectableTextInput } from '~/composable/useMultiSelectableTextInput'

const props = defineProps<{
  categoryId?: string
  subCategoryId?: string
  tagIds?: string[]
  conditionIds?: string[]
  userId?: string
}>()

// カテゴリ
const { categories, subCategories } = useCategoriesStore()
const selectedCategoryId = ref(props.categoryId)
const CategoryFinderComponent = useSingleSelectableTextInput(categories, 'name')

// サブカテゴリ
const selectedSubCategoryId = ref(props.subCategoryId)
const SubCategoryFinderComponent = useSingleSelectableTextInput(subCategories, 'name')

// タグ
const { tags } = useTagsStore()
const selectedTagIds = ref(props.tagIds || [])
const TagFinderComponent = useMultiSelectableTextInput(tags, 'name')

// お譲り条件
const { conditions } = useConditionsStore()
const selectedConditionIds = ref(props.conditionIds || [])
const ConditionFinderComponent = useMultiSelectableTextInput(conditions, 'name')

// ユーザ
const { users } = useUsersStore()
const selectedUserId = ref(props.userId)
const UserFinderComponent = useSingleSelectableTextInput(users, 'nickname')

const router = useRouter()

async function filterPosts(): Promise<void> {
  let queryStrings = createQueryStrings(selectedCategoryId.value, 'categoryId')
  queryStrings = createQueryStrings(selectedSubCategoryId.value, 'subCategoryId', queryStrings)
  queryStrings = createQueryStrings(selectedTagIds.value.join(','), 'tagIds', queryStrings)
  queryStrings = createQueryStrings(selectedConditionIds.value.join(','), 'conditionIds', queryStrings)
  queryStrings = createQueryStrings(selectedUserId.value, 'userId', queryStrings)

  router
    .push({
      path: '/posts',
      query: queryStrings,
    })
    .then(() => router.go(0))
}
</script>
