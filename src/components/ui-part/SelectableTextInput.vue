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
              @click.self="focusChangedInputText"
              @mouseover="inputCloseableFalse"
              @mouseout="inputCloseableTrue"
            >
              <DismissibleButton
                v-for="selectedItem in selectedItems"
                :key="selectedItem.id"
                :label="selectedItem[nameColumn]"
                :item="selectedItem"
                class="m-1"
                @dismiss="itemDismiss"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="relative bg-white overflow-auto" @mouseover="inputCloseableFalse" @mouseout="inputCloseableTrue">
        <SelectableListNode
          v-for="item in filteredItems"
          :key="item.id"
          :checked="selectedItems.indexOf((sItem: any) => sItem.id == item.id) != -1"
          :label="item[nameColumn]"
          :item="item"
          @check-changed="itemChecked"
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

const { nameColumn } = defineProps<{
  selectedItems: any[]
  filteredItems: any
  items: any
  nameColumn: string
  label?: string
}>()

const emits = defineEmits<{
  searchByKeyword: [searchKeyword: string]
  focusChangedInputText: [isInputOpen: boolean]
  itemChecked: [e: Event, item: any]
  itemDismiss: [item: any]
}>()

function searchByKeyword(): void {
  emits('searchByKeyword', searchKeyword.value)
}

function focusChangedInputText(e: any): void {
  emits('focusChangedInputText', e.target.checked)

  isInputOpen.value = !isInputOpen.value
}

function itemDismiss(item: any): void {
  emits('itemDismiss', item)

  inputFocus()
}

function itemChecked(e: any, item: any): void {
  emits('itemChecked', e, item)

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

const closeInputText = () => {
  if (isInputCloseable.value) {
    emits('focusChangedInputText', false)
    isInputOpen.value = false
    isInputCloseable.value = false
  }
}

const inputCloseableTrue = (): void => {
  isInputCloseable.value = true
}
const inputCloseableFalse = (): void => {
  isInputCloseable.value = false
}
</script>
