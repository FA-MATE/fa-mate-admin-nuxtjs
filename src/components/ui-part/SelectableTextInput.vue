<template>
  <div class="relative w-full flex">
    <div v-if="label != undefined" class="whitespace-nowrap pt-1 pr-2">
      {{ label }}
    </div>
    <div class="w-full max-h-8 overflow-visible relative">
      <div class="border bg-white">
        <div class="flex">
          <div class="overflow-hidden flex-1">
            <div class="text-left">
              <input
                v-if="isInputOpen"
                ref="inputRef"
                v-model="searchKeyword"
                v-focus
                type="text"
                class="flex-1 p-1 w-full outline-0 border-b"
                @keyup="searchByKeyword"
                @focus="searchByKeyword"
                @blur="closeInputText"
              />
            </div>
            <div
              class="min-h-8 max-h-8 max-w-full overflow-visible overflow-x-scroll flex"
              @click.self="changedInputTextFocus"
              @mouseover="inputTextCloseableFalse"
              @mouseout="inputTextCloseableTrue"
            >
              <DismissibleButton
                v-for="selectedItem in selectedItems"
                :key="selectedItem.id"
                :label="selectedItem[nameColumn]"
                :item="selectedItem"
                class="m-1"
                @dismiss="dismissItem"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative bg-white overflow-auto"
        @mouseover="inputTextCloseableFalse"
        @mouseout="inputTextCloseableTrue"
      >
        <SelectableListNode
          v-for="item in filteredItems"
          :key="item.id"
          :selected="isSelectedItem(item)"
          :label="item[nameColumn]"
          :item="item"
          @change="changedItemSelectState"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DismissibleButton from './DismissibleButton.vue'
import SelectableListNode from './SelectableListNode.vue'

const searchKeyword = ref('')
const isInputOpen = ref(false)
const isInputCloseable = ref(false)
const inputRef = ref<HTMLInputElement>()

const selectedItems = defineModel<any>()

defineProps<{
  filteredItems: any[]
  items: any
  nameColumn: string
  label?: string
}>()

const emits = defineEmits<{
  searchByKeyword: [searchKeyword: string]
  changedInputTextFocus: [isInputOpen: boolean]
  changedItemSelectState: [selectedItem: Ref, e: Event, item: any]
  dismissItem: [selectedItem: Ref, item: any]
}>()

function searchByKeyword(): void {
  emits('searchByKeyword', searchKeyword.value)
}

function changedInputTextFocus(e: any): void {
  emits('changedInputTextFocus', e.target.checked)

  isInputOpen.value = !isInputOpen.value
}

function dismissItem(item: any): void {
  emits('dismissItem', selectedItems, item)

  inputFocus()
}

const changedItemSelectState = (e: any, item: any): void => {
  emits('changedItemSelectState', selectedItems, e, item)

  inputFocus()
}

function inputFocus(): void {
  if (inputRef.value != undefined) {
    inputRef.value.focus()
  }
}

const vFocus: { mounted: (el: HTMLInputElement) => void } = {
  mounted: (el: HTMLInputElement) => {
    el.focus()
  },
}

const closeInputText = (): void => {
  if (isInputCloseable.value) {
    emits('changedInputTextFocus', false)
    isInputOpen.value = false
    isInputCloseable.value = false
  }
}

const inputTextCloseableFalse = (): void => {
  isInputCloseable.value = false
}

const inputTextCloseableTrue = (): void => {
  isInputCloseable.value = true
}

const isSelectedItem = (item: any): boolean => {
  return selectedItems.value.find((sItem: any) => sItem.id == item.id) != undefined
}
</script>
