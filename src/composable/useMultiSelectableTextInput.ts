import { h, ref } from 'vue'
import SelectableTextInput from '~/components/ui-part/SelectableTextInput.vue'

export const useMultiSelectableTextInput = (items: any[], nameColumn: string, selectedItems: Ref<any[]>): any => {
  const filteredItems = ref<any[]>([])

  function onSearchByKeyword(searchKeyword: string): void {
    filteredItems.value = items.filter((item) => item[nameColumn].includes(searchKeyword))
  }

  function onChangedInputTextFocus(isFocused: boolean): void {
    if (!isFocused) {
      filteredItems.value = []
    }
  }

  function onChangedItemSelectState(e: any, item: any): void {
    if (e.target.checked) {
      selectedItems.value = [item, ...selectedItems.value]
    } else {
      selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id != item.id)
    }
  }

  function onDismissItem(item: any): void {
    selectedItems.value = selectedItems.value.filter((selectedItem) => selectedItem.id != item.id)
  }

  const render = (): any =>
    h(SelectableTextInput, {
      selectedItems: selectedItems.value,
      filteredItems: filteredItems.value,
      items,
      nameColumn,
      onSearchByKeyword,
      onChangedInputTextFocus,
      onChangedItemSelectState,
      onDismissItem,
    })

  const UseMultiSelectableTextInputComponent = defineComponent({ render })
  return UseMultiSelectableTextInputComponent
}
