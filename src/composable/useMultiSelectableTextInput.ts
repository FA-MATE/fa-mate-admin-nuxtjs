import { defineComponent, h, ref } from 'vue'
import MultiSelectableTextInput from '~/components/ui-part/MultiSelectableTextInput.vue'

export const useMultiSelectableTextInput = (items: any[], nameColumn: string, selectedItems: Ref<any[]>): any => {
  const filteredItems = ref<any[]>([])

  function onSearchKeywordChanged(searchKeyword: string): void {
    filteredItems.value = items.filter((item) => item[nameColumn].includes(searchKeyword))
  }

  function onFocusChanged(isFocused: boolean): void {
    if (!isFocused) {
      filteredItems.value = []
    }
  }

  function onItemChecked(e: any, item: any): void {
    if (e.target.checked) {
      selectedItems.value = [item, ...selectedItems.value]
    } else {
      selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id != item.id)
    }
  }

  function onItemDismiss(item: any): void {
    selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id != item.id)
  }

  const render = (): any =>
    h(MultiSelectableTextInput, {
      selectedItems: selectedItems.value,
      filteredItems: filteredItems.value,
      items,
      nameColumn,
      onSearchKeywordChanged,
      onFocusChanged,
      onItemChecked,
      onItemDismiss,
    })

  const UseMultiSelectableTextInputComponent = defineComponent({ render })
  return UseMultiSelectableTextInputComponent
}
