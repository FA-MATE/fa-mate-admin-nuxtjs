import { h, ref } from 'vue'
import SelectableTextInput from '~/components/ui-part/SelectableTextInput.vue'

export const useSingleSelectableTextInput = (items: any[], nameColumn: string, selectedItem: Ref): any => {
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
      selectedItem.value = item
    } else {
      selectedItem.value.em = null
    }
  }

  function onDismissItem(): void {
    selectedItem.value = null
  }

  const render = (): any => {
    return h(SelectableTextInput, {
      selectedItems: selectedItem.value != null ? [selectedItem.value] : [],
      filteredItems: filteredItems.value,
      items,
      nameColumn,
      onSearchByKeyword,
      onChangedInputTextFocus,
      onChangedItemSelectState,
      onDismissItem,
    })
  }
  const UseSingleSelectableTextInputComponent = defineComponent({ render })
  return UseSingleSelectableTextInputComponent
}
